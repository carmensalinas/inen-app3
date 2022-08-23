#Import libraries
import numpy as np
import cv2#3.4..
from skimage.io import imread #pip install scikit-image==0.14.2 && pip install numpy==1.15
from skimage.transform import resize
from werkzeug.utils import secure_filename

from flask import Flask, request,Response
from flask_cors import CORS
from tensorflow.keras.models import load_model
import argparse
ap = argparse.ArgumentParser()
ap.add_argument("-p", "--port", required=True, help="Service PORT number is required.")
args = vars(ap.parse_args())

port = args['port']
print("Port recognized: ", port)

#Params
UPLOAD_FOLDER = 'uploads/images'
SAVE_FOLDER = 'uploads/model_images'
JOIN_FOLDER = 'uploads/join_images'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'nii'])


#Initialize the application service (FLASK)
app = Flask(__name__)
CORS(app)

#Vars
global model

model = load_model('model_128_128.h5')

#Functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#Define a default route
@app.route('/')
def main_page():
	return 'REST service is active via Flask!'
@app.route('/model/predict/',methods=['POST'])
def predict():
    if request.method == "POST":
        # check if the post request has the file part
        if 'file' not in request.files:
            print('No file part')
        file = request.files['file']
        # if user does not select file, browser also submit a empty part without filename
        if file.filename == '':
            print('No selected file')
        if file and allowed_file(file.filename):
            print("\nFilename received:",file.filename)
            filename = secure_filename(file.filename)
            tmpfile = ''.join([UPLOAD_FOLDER ,'/',filename]) 
            file.save(tmpfile) #save image
            print("\nFilename stored:",tmpfile)
            Xtest=[]
            width_shape, height_shape = 128, 128
            img = imread(tmpfile) 
            img = resize(img, (height_shape, width_shape),mode='constant', preserve_range=True)
            Xtest.append(img)
            X_test = np.array([img])
            preds = model.predict(X_test)
            #save
            img=preds[0]*255
            img=img.astype(np.float32)
            #img_ = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
            cv2.imwrite('out.png',img)
            
            # prepare image for response
            _, img_encoded = cv2.imencode('.png', img)
            response = img_encoded.tostring()
            try:
                return Response(response=response, status=200, mimetype='image/png')
            except FileNotFoundError:
                abort(404)

if __name__ == '__main__':   
# Run de application
    app.run(host='0.0.0.0',port=port, threaded=False,debug=True)