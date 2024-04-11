import cv2
import numpy as np
from pathlib import Path
import os
import re

BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = BASE_DIR / "chessPal/images/"
#BASE_DIR = Path(__file__).resolve().parent
#MEDIA_ROOT = BASE_DIR / "images/"


import os
import ddddocr


class Image():
    
    def __init__(self, img_path) -> None:
        self.img = cv2.imread(img_path)
        
        self.img = cv2.resize(self.img, (500, 700), interpolation=cv2.INTER_CUBIC)
        
        #self.img = cv2.convertScaleAbs(self.img, alpha=0.8, beta=0)

        self.labels = ['25', '50', '24', '49', '23', '48', '22', '47', '21', '46', '20', '45', '19', 
                       '44', '18', '43', '17', '42', '16', '41', '15', '40', '14', '39', '13', '38',
                         '12', '37', '11', '36', '10', '35', '9', '34', '8', '33', '7', '32', '6', '31',
                           '5', '30', '4', '29', '3', '28', '2', '27', '1', '26']


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

    def main_segment(self, image):
        if image is not None:
            template = cv2.imread(f"./images/2.png")
            template = cv2.resize(template, (500, 700), interpolation=cv2.INTER_CUBIC)
            resize = cv2.resize(image, (500, 700), interpolation=cv2.INTER_CUBIC)


            

            temp_grey = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
            _, mask = cv2.threshold(temp_grey, 150, 255, cv2.THRESH_BINARY)
            mask = cv2.bitwise_not(mask)
            mask = cv2.bitwise_not(mask)

            
           
            template = cv2.bitwise_and(template, template, mask=mask)
            
            result = np.where(template == 0, template, resize)
            
            cv2.imshow('Result', result)
            cv2.waitKey(0)
        else:
            return("error")
        
    def match_page_template(self, image, template):
        image_grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        template = cv2.imread(f"./images/4.png")
        template_grey = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

        sift = cv2.SIFT_create()
        matcher = cv2.BFMatcher()
        keypoints1, descriptors1 = sift.detectAndCompute(template_grey, None)
        keypoints2, descriptors2 = sift.detectAndCompute(image_grey, None)

        matches = matcher.knnMatch(descriptors1, descriptors2, k=2)

        matches = sorted(matches, key=lambda x: x[0].distance)
        good_matches = []
        for m, n in matches:
            if m.distance < 0.75 * n.distance:
                good_matches.append(m)

        matched_img = cv2.drawMatches(template, keypoints1, image, keypoints2, good_matches[:10], None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)
        cv2.imshow('Matched', matched_img)
        cv2.waitKey(0)
        
          
    
    def find_page(self, image):

        temp_image = image.copy()

        grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        grey = cv2.medianBlur(grey, 5)
        
       # _, thresh = cv2.threshold(grey, 150, 255, cv2.THRESH_BINARY)
        
        thresh = cv2.adaptiveThreshold(grey, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)
    
        contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        page = max(contours, key=cv2.contourArea)

        cv2.drawContours(temp_image, [page], -1, (0, 255, 0), 2)
    


        mask = np.zeros_like(grey)

        
        cv2.drawContours(mask, [page], -1, (255), thickness=cv2.FILLED)

        result = cv2.bitwise_and(temp_image, temp_image, mask=mask)
        result[mask == 0] = (255, 255, 255)

        edges = cv2.Canny(result, 30, 100)
        contours, _ = cv2.findContours(edges.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contour = max(contours, key=cv2.contourArea)

        

        peri = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.02 * peri, True)

        pts1 = np.float32(approx)
        pts2 = np.float32([[0, 0], [0, 700], [500, 700], [500, 0]])

        matrix = cv2.getPerspectiveTransform(pts1, pts2)
        result = cv2.warpPerspective(result, matrix, (500, 700))

        return result

    def findCells(self, template, image, x, y, w, h):
        if template is not None:
            copy = template.copy
            length = np.array(template).shape[1]//100
            hor_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (length, 1))
            ver_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, length))
            
            grey = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
            edged = cv2.Canny(grey, 200, 200)


            hor_det = cv2.erode(edged, hor_kernel, iterations=1)
            hor_line = cv2.dilate(hor_det, hor_kernel, iterations=3)


            ver_det = cv2.erode(edged, ver_kernel, iterations=1)
            ver_line = cv2.dilate(ver_det, ver_kernel, iterations=3)

            ver_hor = cv2.addWeighted(ver_line, 0.5, hor_line,  0.5, 0.0)

            
            #open edges
            ver_hor = cv2.morphologyEx(edged, cv2.MORPH_CLOSE , np.ones((4, 4), np.uint8), iterations=2)
            #ver_hor = cv2.open(ver_hor, np.ones((4, 4), np.uint8), iterations=2)
            
            contours, _ = cv2.findContours(ver_hor, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

            #cv2.drawContours(template, contours, -1, (0, 255, 0), 2)

            contours = [contour for contour in contours if 10000 > cv2.contourArea(contour)]
            
            i = 0
            sorted_contours = []
            group = []
            for contour in contours:
                
                if i == 6:
                    #sort contours based on x coordinate
                    group = sorted(group, key=lambda c: cv2.boundingRect(c)[0])
                    sorted_contours.append(group)
                    group = []
                    group.insert(i, contour)
                    i = 1
                else:
                    group.insert(i, contour)
                    i = i + 1
            group = sorted(group, key=lambda c: cv2.boundingRect(c)[0])
            sorted_contours.append(group)

            i = 0
            j = 0
            for contour in sorted_contours:
                #draw the contour
                for c in contour:
                    #every 3 contour new place in array
                    if i == 3:
                        i = 0
                        j = j + 1

                    

                    
                    x, y, w, h = cv2.boundingRect(c)
                    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 1)
                    #cv2.imshow('Template', image)
                    #cv2.waitKey(0)
                    path = BASE_DIR / "media/cells"

                    tempImage = image[y:y + h, x:x + w]
                    #if i != 0:
                    #    print('1')
                    #    cv2.resize(tempImage, (tempImage.shape[1] * 2, tempImage.shape[0] * 2), interpolation=cv2.INTER_CUBIC)

                    cv2.imwrite(f'{path}/{self.labels[j]}-{i}.png',tempImage)
                    #cv2.imwrite(f'./media/cells/{self.labels[j]}-{i}.png', image[y:y + h, x:x + w])

                    i = i + 1
                    



#im = f"{MEDIA_ROOT}/template.png"

SAN_REGEX = re.compile(r"^([NBKRQ])?([a-h])?([1-8])?[\-x]?([a-h][1-8])(=?[nbrqkNBRQK])?[\+#]?\Z")

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
            

    def cells_img2text(self, one_per_cell=True) -> list[list[str]]:
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
            image = cv2.resize(image, (500, 700), interpolation=cv2.INTER_CUBIC)
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            _, binary_image = cv2.threshold(gray_image, 180, 255, cv2.THRESH_BINARY)

            # cv2.imwrite('binary_image.jpg', binary_image)
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
        
        def is_valid_san(san: str) -> bool:
            return bool(SAN_REGEX.match(san)) or san in ["O-O", "O-O+", "O-O#", "0-0", "0-0+", "0-0#", "O-O-O", "O-O-O+", "O-O-O#", "0-0-0", "0-0-0+", "0-0-0#"]
        
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
                        if j == 0 and (len(text.strip()) <= 1 or text.strip().isdigit()):  # if first cell is empty or contains only numbers
                            possible_texts.append('')
                            break 
                        text = text.strip()
                        if len(text) > 0 and is_valid_text(text) and is_valid_san(text):
                            possible_texts.append(text)
                    if possible_texts:
                        texts[i] = [possible_texts[0]] if one_per_cell else possible_texts
                    else:
                        texts[i] = ['']
            except Exception as e:
                print(f"Cell {i} Error: {e}")
                continue
        return texts

def remove_files_in_folder(folder_path):
    
    files_in_folder = os.listdir(folder_path)

    for file_name in files_in_folder:
        file_path = os.path.join(folder_path, file_name)
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error removing file {file_path}: {e}")

def process_image(image_path):
    try:
        image = Image(image_path)

        x, y, w, h = 122, 41, 518, 418

        ##find page in the image
        found_page = image.find_page(image.img)



        found_page = cv2.resize(found_page, (500, 700), interpolation=cv2.INTER_CUBIC)
        template = cv2.imread(f'{MEDIA_ROOT}/template2.png')
        template= cv2.resize(template, (500, 700), interpolation=cv2.INTER_CUBIC)

        template = template[135:640, 35:464]

        #found_page = found_page[68:653,   5:500]

        #found_page = cv2.resize(found_page, (template.shape[1], template.shape[0]), interpolation=cv2.INTER_CUBIC)


        #image.match_page_template(found_page, template)
        #115:618, 30:459
        found_page = found_page[129:634, 35:464]    

        image.findCells(template, found_page, x, y, w, h)


        #path = f'./media/cells'
        path = BASE_DIR / "media/cells"

        png_files = [filename for filename in os.listdir(path) if filename.lower().endswith('.png')]
        png_files.sort(key=lambda x: [int(part) if part.isdigit() else part for part in re.split('([0-9]+)', x)])
        moves = []
        for filename in png_files:
            image_path = os.path.join(path, filename)
            #check if file name is 1-0, 2-0, 3-0 ...

            f1 = filename.split('-')[0]
            f2 = (filename.split('-')[1]).split('.')[0]

            if f2 != '0':
                move = (Recognizer([image_path
                ]).cells_img2text())
                if(image.test == True):
                    print(filename)
                    print(move)
                moves.append(move)
            else:
                moves.append([[f1]])

        if(image.test == True):   
            print(moves)

    except Exception as e:
        print(f"Error processing image: {e}")
        moves = ['ERROR 931: Unable to process image']

    try:
        remove_files_in_folder(path)
        remove_files_in_folder(BASE_DIR / "media" / "uploads")
    except Exception as e:
        print(f"Error removing files: {e}")

    return moves
#remove_files_in_folder(BASE_DIR / "media/cells")
#process_image(f"{MEDIA_ROOT}/testImage3.png")



        
