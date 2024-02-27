import os

def ensure_folders_exist():
    folder_paths = [
        './media',
        './media/uploads',
        './media/rows',
        './media/cells'
        # Add more folder paths as needed
    ]

    project_base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


    for folder_path in folder_paths:
        full_path = os.path.join(project_base_dir, folder_path)
    
        if not os.path.exists(full_path):
            os.makedirs(full_path)
            print(f"Created folder: {folder_path}")
ensure_folders_exist()