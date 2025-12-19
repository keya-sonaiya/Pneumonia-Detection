def predict_image(model, img_array, class_names):
    """
    Predict class and probabilities using trained model.
    """
    prob_pneumonia = float(model.predict(img_array, verbose=0)[0][0])
    prob_normal = 1 - prob_pneumonia

    predicted_class = class_names[1] if prob_pneumonia > 0.5 else class_names[0]

    return predicted_class, prob_normal, prob_pneumonia
