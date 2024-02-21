import cv2
import numpy as np

class Image():
    
    def __init__(self, img_path) -> None:
        self.img = cv2.imread(img_path)
        self.img = cv2.resize(self.img, (500, 700))


        if self.img is None:
            print(f"Error: Unable to load image from {img_path}")

    
    def show_image(self, image):
        if image is not None:
            cv2.imshow('Image', image)
            cv2.waitKey(0)
            cv2.destroyAllWindows()

    def findCells(self, image):
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

            #xor = cv2.bitwise_xor(grey, ver_hor)
            #inv = cv2.bitwise_not(xor)

            contours, _ = cv2.findContours(ver_hor, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
            contours = [contour for contour in contours if cv2.contourArea(contour) > 248]
            contours = self.sort_contours(contours, method="left-to-right")
            
            groups = self.group_contours(contours, max_distance=100)

            for row, contour_group in enumerate(groups):
                for col, contour in enumerate(contour_group):
                    # Draw rectangles on the original image to visualize cells
                    x, y, w, h = cv2.boundingRect(contour)
                    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

                    # Crop and save each cell
                    cell = image[y:y+h, x:x+w]
                    cv2.imwrite(f"cells/cell_{row}_{col}_{cv2.contourArea(contour)}.png", cell)
            cv2.imshow('I with C', image)
            cv2.waitKey(0)
            

    def sort_contours(self, contours, method="left-to-right"):
        reverse = False
        i = 0

        if method == "right-to-left" or method == "bottom-to-top":
            reverse = True
        if method == "top-to-bottom" or method == "bottom-to-top":
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


image = Image("./images/template.png")
contours = image.findCells(image.img)