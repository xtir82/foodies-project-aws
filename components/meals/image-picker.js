'use client'

import React, {useRef, useState} from 'react';

import styles from './image-picker.module.css';
import Image from "next/image";

const ImagePicker = ({label, name}) => {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    const handlePickClick = () => {
        imageInput.current.click()
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={styles.picker}>
            <label htmlFor="image">{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt="The image slected by the user."
                            fill
                        />
                    )}
                </div>
                <input
                    className={styles.input}
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button className={styles.button} type="button" onClick={handlePickClick}>Pick an Image</button>
            </div>
        </div>
    );
};

export default ImagePicker;