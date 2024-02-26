import cv2
import numpy as np

import os
import ddddocr

class Image():
    
    def __init__(self, img_path) -> None:
        self.img = cv2.imread(img_path)
        self.img = cv2.resize(self.img, (500, 700))

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

            
            contours = [contour for contour in contours if cv2.contourArea(contour) > 248]

            contours = self.sort_contours(contours, method="top-to-bottom")

            
    
            groups = self.group_contours(contours, max_distance=0)
            i = 0
            for row, contour_group in enumerate(groups):
                for col, contour in enumerate(contour_group):
                    # Draw rectangles on the original image to visualize cells
                    x1, y1, w1, h1 = cv2.boundingRect(contour)
                    if x1 >= x and y1 >= y and w1 <= w and h1 <= h:
                        temp = image.copy()
                        if(self.test):
                            cv2.rectangle(temp, (x1, y1), (x1 + w1, y1 + h1), (0, 255, 0), 2)
                            cv2.imshow("temp", temp)
                            cv2.waitKey(0)

                        # Crop and save each cell
                        cell = temp[y1:y1+h1, x1:x1+w1]
                        cv2.imwrite(f"cells/cell_{i}_{row}_{col}_{cv2.contourArea(contour)}.png", cell)
                        i = i + 1
            cv2.imshow('I with C', image)
            cv2.waitKey(0)
            

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


class Recognizer:
    
    # define slots for class attributes
    # imgs: list[np.ndarray] - list of cell images
    # default: True when using default OCR model, False when using custom OCR model
    # ocrs: list[ddddocr.DdddOcr] - list of OCR models
    __slots__ = ["imgs", "default", "ocrs"]

    def __init__(self, imgs: list[str], default: bool = True, ocrs = list[ddddocr.DdddOcr]) -> None:
        self.imgs = imgs
        
        if default:
            cwd = os.getcwd()
            model_path = os.path.join(cwd, 'models', 'chess_1_0.90625_359_149000_2024-02-23-13-51-37.onnx')
            charset_path = os.path.join(cwd, 'models', 'charsets.json')
            self.ocrs = [
                ddddocr.DdddOcr(det=False, ocr=True, beta=False, show_ad=False),
                ddddocr.DdddOcr(det=False, ocr=True, beta=False, show_ad=False, import_onnx_path=model_path, charsets_path=charset_path),
                # TODO: Add more OCR models here
            ]
        else:
            if not all(isinstance(ocr, ddddocr.DdddOcr) for ocr in ocrs):
                raise ValueError("All OCR models must be of type ddddocr.DdddOcr")
            self.ocrs = ocrs
            

    def cells_img2text(self) -> list[str]:
        """
        Convert images of cells to text using OCR.
        
        TODO: Add more OCR methods and pretrained models.

        Args:
            cells (list[np.ndarray]): List of cell images.

        Returns:
            list[str]: List of strings that cell images contain.
        """
        def is_valid_text(s: str) -> bool:
            chess_character_set = {
                'K', 'Q', 'R', 'B', 'N', 'P',  # Piece Notation
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',  # File/Rank Notation
                'x', '+', '#',  # Move Notation
                'O', 'o',  # Castling Notation
                '=',  # Pawn Promotion
                '.',  # Empty Square
                '1', '2', '3', '4', '5', '6', '7', '8',  # Numbers
                '-', '/',
                # '1-0', '0-1', '1/2-1/2',  # Result Notation
                '!', '?',  # Game Annotation
            }
            return all(c in chess_character_set for c in s)

        texts = [None] * len(self.imgs)
        for i, file_name in enumerate(self.imgs):
            try:
                # img_bytes = np.array(cv2.imencode('.png', cell.img)[1]).tobytes()  # Convert image to bytes
                with open(file_name, 'rb') as f:
                    img_bytes = f.read() 
                    possible_texts = []
                    for ocr in self.ocrs:
                        text = ocr.classification(img_bytes)
                        if len(text.strip()) > 0 and is_valid_text(text):
                            possible_texts.append(text)
                            break
                    texts[i] = possible_texts
            except Exception as e:
                print(f"Cell {i} Error: {e}")
                continue
        return texts


# image = Image("./images/template.png")
# x, y, w, h = image.findPage(image.img)
# image.findCells(image.img, x, y, w, h)

# Example usage of Recognizer
test_imgs_folder = "./images/"

os.chdir(os.path.dirname(__file__))  # Change working directory to current file
print(Recognizer([test_imgs_folder + "Qc7.png",
                  test_imgs_folder + "d5.png",
                  test_imgs_folder + "Pe4.png",
]).cells_img2text())