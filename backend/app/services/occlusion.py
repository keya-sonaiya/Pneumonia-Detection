import numpy as np
import cv2

def generate_occlusion_map(model, img_array, patch_size=16, stride=8):
    img = img_array[0]
    H, W = img.shape[:2]

    base_pred = float(model.predict(img_array, verbose=0)[0][0]) 

    heatmap = np.zeros((H, W), dtype=np.float32)
    counts = np.zeros((H, W), dtype=np.int32)

    for y in range(0, H, stride):
        for x in range(0, W, stride):
            y1, x1 = y, x
            y2, x2 = min(y + patch_size, H), min(x + patch_size, W)

            occluded = img.copy()
            occluded[y1:y2, x1:x2] = 0.0

            p = float(model.predict(np.expand_dims(occluded, 0), verbose=0)[0][0])
            drop = base_pred - p

            heatmap[y1:y2, x1:x2] += drop
            counts[y1:y2, x1:x2] += 1

    counts = np.maximum(counts, 1)
    heatmap = heatmap / counts

    # normalize 0..1
    hm_min, hm_max = heatmap.min(), heatmap.max()
    heatmap = (heatmap - hm_min) / (hm_max - hm_min + 1e-8)

    # Convert to RGB heatmap for saving
    heat_uint8 = np.uint8(255 * heatmap)
    heatmap_color = cv2.applyColorMap(heat_uint8, cv2.COLORMAP_JET)
    heatmap_color = cv2.cvtColor(heatmap_color, cv2.COLOR_BGR2RGB)
    

    return heatmap_color
