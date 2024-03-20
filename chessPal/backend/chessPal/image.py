import cv2
import numpy as np
from pathlib import Path
import os
import re

BASE_DIR = Path(__file__).resolve().parent
MEDIA_ROOT = BASE_DIR / "images/"


import os
import ddddocr

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
        
    def segment_cells(self):
        path = f'./media/rows'
        j = 1
        cell_type = ['move_num', 'white', 'black']
        for filename in os.listdir(path):
            if(j > 50):
                break
            image_path = os.path.join(path, filename)
            img = cv2.imread(image_path)
            h, w, _= img.shape
            img = cv2.rectangle(img, (0,0), (w -1, h -1), (0,0,0), 2)

            grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            edged = cv2.Canny(grey, 0, 200)

            contours, _ = cv2.findContours(edged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
            contours = sorted(contours, key=cv2.contourArea, reverse=True)[1:4]
            contours = sorted(contours, key=lambda c: cv2.boundingRect(c)[0])

            prefix = filename.removesuffix('.png')
            
            for i, contour in enumerate(contours):
                x, y, w, h = cv2.boundingRect(contour)
                cell = img[y:y + h, x:x + w]
                cv2.imwrite(f'./media/cells/{prefix}-{i}.png', cell)

                if(self.test):
                    cv2.imshow('', cell)
                    cv2.waitKey(0)
            j = j + 1

    def findRows(self, image, x, y, w, h):
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
                            cv2.imwrite(f'./media/rows/{label}.png', cell)

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
                                cv2.imwrite(f'./media/rows/{label}.png', cell)

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

class Recognizer:
    
    # define slots for class attributes
    # imgs: list[np.ndarray] - list of cell images
    # default: True when using default OCR model, False when using custom OCR model
    # ocrs: list[ddddocr.DdddOcr] - list of OCR models
    __slots__ = ["imgs", "default", "ocrs"]

    def __init__(self, imgs: list[str], default: bool = True, ocrs = list[ddddocr.DdddOcr]) -> None:
        self.imgs = imgs
        
        if default:
            os.chdir(os.path.dirname(__file__))
            #model_path = os.path.join(cwd, 'models', 'chess_1_0.90625_359_149000_2024-02-23-13-51-37.onnx')
            model_path = './models/chess_1_0.90625_359_149000_2024-02-23-13-51-37.onnx'
            #charset_path = os.path.join(cwd, 'models', 'charsets.json')
            charset_path = './models/charsets.json'
            self.ocrs = [
                ddddocr.DdddOcr(det=False, ocr=True, beta=False, show_ad=False),
                ddddocr.DdddOcr(det=False, ocr=True, beta=False, show_ad=False, import_onnx_path=model_path, charsets_path=charset_path),
                # TODO: Add more OCR models here
            ]
        else:
            if not all(isinstance(ocr, ddddocr.DdddOcr) for ocr in ocrs):
                raise ValueError("All OCR models must be of type ddddocr.DdddOcr")
            self.ocrs = ocrs
            

    def cells_img2text(self) -> list[list[str]]:
        """
        Convert images of cells to text using OCR.
        
        TODO: Add more OCR methods and pretrained models.

        Args:
            cells (list[np.ndarray]): List of cell images.

        Returns:
            list[list[str]]: List of candidate strings that cell images can match.
        """
        def white_pixels_above_threshold(filename, threshold):
            image = cv2.imread(filename)
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            _, binary_image = cv2.threshold(gray_image, 180, 255, cv2.THRESH_BINARY)
            cv2.imwrite('binary_image.jpg', binary_image)
            num_white_pixels = cv2.countNonZero(binary_image)
            total_pixels = binary_image.shape[0] * binary_image.shape[1]
            return num_white_pixels > threshold * total_pixels

        def is_valid_text(s: str) -> bool:
            chess_character_set = {
                'K', 'Q', 'R', 'B', 'N', 'P',  # Piece Notation
                'k', 'q', 'r', 'b', 'n', 'p',  # Piece Notation
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',  # File/Rank Notation
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',  # File/Rank Notation
                'X', 'x', '+', '#',  # Move Notation
                'O', 'o',  # Castling Notation
                '=',  # Pawn Promotion
                '.',  # Empty Square
                '1', '2', '3', '4', '5', '6', '7', '8', '0',  # Numbers
                '-', '/',
                # '1-0', '0-1', '1/2-1/2',  # Result Notation
                '!', '?',  # Game Annotation
            }
            return all(c in chess_character_set for c in s)

        texts = [None] * len(self.imgs)
        for i, file_name in enumerate(self.imgs):
            try:
                # img_bytes = np.array(cv2.imencode('.png', cell.img)[1]).tobytes()  # Convert image to bytes, but this is not going to work
                with open(file_name, 'rb') as f:
                    if white_pixels_above_threshold(file_name, 0.85):
                        texts[i] = ['']
                        continue
                    img_bytes = f.read()
                    possible_texts = []
                    for j, ocr in enumerate(self.ocrs):
                        text = ocr.classification(img_bytes)
                        if j == 0 and (len(text.strip()) <= 1 or text.strip().isalnum()):  # if first cell is empty or contains only numbers
                            possible_texts.append('')
                            break 
                        if len(text.strip()) > 0 and is_valid_text(text):
                            possible_texts.append(text)
                    texts[i] = possible_texts
            except Exception as e:
                print(f"Cell {i} Error: {e}")
                continue
        return texts

print(Recognizer([f'./images/1 ({i}).png' for i in range(1, 12)]).cells_img2text())

def remove_files_in_folder(folder_path):
    
    files_in_folder = os.listdir(folder_path)

    for file_name in files_in_folder:
        file_path = os.path.join(folder_path, file_name)
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error removing file {file_path}: {e}")

def process_image(image_path):
    image = Image(image_path)
    x,y,w,h = image.findPage(image.img)
    image.findRows(image.img, x, y, w, h)
    image.segment_cells()

    path = f'./media/cells'
    png_files = [filename for filename in os.listdir(path) if filename.lower().endswith('.png')]
    png_files.sort(key=lambda x: [int(part) if part.isdigit() else part for part in re.split('([0-9]+)', x)])
    moves = []
    for filename in png_files:
        image_path = os.path.join(path, filename)
        move = (Recognizer([image_path
        ]).cells_img2text())
        if(image.test == True):
            print(move)
        moves.append(move)
        if(len(moves) == 8):
            break

    remove_files_in_folder("./media/rows/")
    remove_files_in_folder("./media/cells/")
    remove_files_in_folder("./media/uploads")

    return moves


        
