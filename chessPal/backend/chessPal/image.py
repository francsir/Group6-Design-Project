import cv2
import numpy as np
import pytesseract
from pathlib import Path
import os
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\linda\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

BASE_DIR = Path(__file__).resolve().parent
MEDIA_ROOT = BASE_DIR / "images/"


class Image():
    
    def __init__(self, img_path) -> None:
        self.img = cv2.imread(img_path)
        self.img = cv2.resize(self.img, (500, 700))
        self.labels = ['BLACK2', 'WHITE2', 'BLACK1', 'WHITE1',
                        '26','1','27','2','28','3','29','4','30','5','31','6',
                       '32','7','33','8','34','9','35','10','36','11','37','12','38','13','39','14','40','15','41',
                       '16','42','17','43','18','44','19','45','20','46','21','47','22','48','23','49','24','50',
                       '25']
        self.coordinates_dict = {label: {'x': 0, 'y': 0, 'w': 0, 'h': 0} for label in self.labels}   
     


        ## Variable that is true for some testing features, set to False for Release
        self.test = False


        if self.img is None:
            print(f"Error: Unable to load image from {img_path}")

    
    def image_to_string(self, image, path):

        height, width = image.shape[:2]
        grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, threshold_img = cv2.threshold(grey, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        img = cv2.resize(threshold_img, (10*width, 10*height))


        

        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced_img = clahe.apply(img)

        #self.show_image(enhanced_img)
        custom_config = r'--psm 10 --oem 3'
        return(f'{pytesseract.image_to_string(enhanced_img, lang='eng', config=custom_config)}')



    def show_image(self, image):
        if image is not None:
            cv2.imshow('Image', image)
            cv2.waitKey(0)
            cv2.destroyAllWindows()

    def findPage(self, image):
        if image is not None:
            grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            edged = cv2.Canny(grey, 0, 200)

            contours, _ = cv2.findContours(edged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

            maxArea = 0
            page = None
            for contour in contours:
                if cv2.contourArea(contour) > maxArea:
                    page = contour
                    maxArea = cv2.contourArea(contour)

            if(self.test):
                x, y, w, h = cv2.boundingRect(page)
                tempImage = image.copy()
                cell = tempImage[y:y+h, x:x+w]
                #cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

                cv2.imshow('3', cell)
                cv2.waitKey(0)

            return cv2.boundingRect(page)
        else:
            return("error")
    
    def findCells(self, image, x, y, w, h):
        if image is not None:
            copy = image.copy
            length = np.array(image).shape[1]//100
            hor_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (length, 1))
            ver_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, length))
            
            grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            edged = cv2.Canny(grey, 0, 200)

    

            hor_det = cv2.erode(edged, hor_kernel, iterations=3)
            hor_line = cv2.dilate(hor_det, hor_kernel, iterations=3)


            ver_det = cv2.erode(edged, ver_kernel, iterations=2)
            ver_line = cv2.dilate(ver_det, ver_kernel, iterations=3)

            

            ver_hor = cv2.addWeighted(ver_line, 0.5, hor_line,  0.5, 0.0)

            contours, _ = cv2.findContours(ver_hor, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

            
            contours = [contour for contour in contours if 1004 > cv2.contourArea(contour) > 248 or cv2.contourArea(contour) > 1004]

            contours = self.sort_contours(contours, method="top-to-bottom")

            
    
            groups = self.group_contours(contours, max_distance=0)
            i = 0
            j = 4

            labels = []
            for _, contour_group in enumerate(groups):
                for _, contour in enumerate(contour_group):
                    x1, y1, w1, h1 = cv2.boundingRect(contour)
                    if x1 >= x and y1 >= y and w1 <= w and h1 <= h:
                        temp = image.copy()
                        if(self.test):
                            cv2.rectangle(temp, (x1, y1), (x1 + w1, y1 + h1), (0, 255, 0), 2)
                            cv2.imshow("temp", temp)
                            cv2.waitKey(0)

                        # Crop and save each cell
                        cell = temp[y1:y1+h1, x1:x1+w1]
                        if(i < 4):
                            label = self.labels[i]
                            self.coordinates_dict[label]['x'] = x1
                            self.coordinates_dict[label]['y'] = y1
                            self.coordinates_dict[label]['w'] = w1
                            self.coordinates_dict[label]['h'] = h1

                            x_ = self.coordinates_dict[label]['x']
                            y_ = self.coordinates_dict[label]['y']
                            w_ = self.coordinates_dict[label]['w']
                            h_ = self.coordinates_dict[label]['h']

                            cell = temp[y_:y_+h_, x_:x_+w_]
                            cv2.imwrite(f'./cells/{label}.png', cell)

                        if(i >= 4 and j < len(self.labels)):
                            k = (i - 4) % 3
                            label = self.labels[j]
                            if k == 0:
                                self.coordinates_dict[label]['w'] = w1
                                self.coordinates_dict[label]['h'] = h1
                            if k == 1:
                                self.coordinates_dict[label]['w'] = self.coordinates_dict[label]['w'] + w1
                            if k == 2:
                                self.coordinates_dict[label]['x'] = x1
                                self.coordinates_dict[label]['y'] = y1
                                self.coordinates_dict[label]['w'] = self.coordinates_dict[label]['w'] + w1

                                x_ = self.coordinates_dict[label]['x']
                                y_ = self.coordinates_dict[label]['y']
                                w_ = self.coordinates_dict[label]['w']
                                h_ = self.coordinates_dict[label]['h']


                                cell = temp[y_:y_+h_, x_:x_+w_]
                                cv2.imwrite(f'./media/cells/{label}.png', cell)

                                j = j + 1
                        i = i + 1

            ##cv2.imshow('I with C', image)
            ##cv2.waitKey(0)  

    def sort_contours(self, contours, method):
        reverse = False
        i = 0

        if method == "right-to-left" or method == "bottom-to-top":
            reverse = True
        if method == "top-to-bottom" or method == "left-to-right":
            i = 1
        
        bounding_boxes = [cv2.boundingRect(c) for c in contours]
        (contours, bounding_boxes) = zip(*sorted(zip(contours, bounding_boxes), key=lambda b: b[1][i], reverse=reverse))


        return contours
    
    def group_contours(self, contours, max_distance):
        groups = []
        current_group = [contours[0]]

        for i in range(1, len(contours)):
            if abs(cv2.boundingRect(contours[i])[1] - cv2.boundingRect(current_group[-1])[1]) < max_distance:
                current_group.append(contours[i])
            else:
                # Sort the contours in the current group by their x-coordinate
                current_group = sorted(current_group, key=lambda c: cv2.boundingRect(c)[0])
                groups.append(current_group)
                current_group = [contours[i]]
        groups.append(current_group)
        return groups

#im = f"{MEDIA_ROOT}/template.png"

def process_image(image_path):
    image = Image(image_path)

    x, y, w, h = image.findPage(image.img)
    image.findCells(image.img, x, y, w, h)

    #for i in image.coordinates_dict:
    #    x = image.coordinates_dict[i]['x']
    #    y = image.coordinates_dict[i]['y']
    #    w = image.coordinates_dict[i]['w']
    #    h = image.coordinates_dict[i]['h']
    #
    #    cv2.rectangle(image.img, (x,y), (x + w, y + h), (0, 255, 0), 2)
    #    cv2.imshow("temp", image.img)
    #    cv2.waitKey(0)
#process_image(im)



