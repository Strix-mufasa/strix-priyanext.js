
/**
 * Cloudinary Storage Utility
 * 
 * To use this:
 * 1. Create a free account at https://cloudinary.com
 * 2. Go to Settings > Upload > Upload presets
 * 3. Click "Add upload preset"
 * 4. Name it "strix_unsigned" (or change the constant below)
 * 5. Set "Signing Mode" to "Unsigned"
 * 6. Save and copy your "Cloud Name" from the Dashboard
 */

// TODO: REPLACE THESE WTH YOUR ACTUAL CLOUDINARY DETAILS
const CLOUD_NAME = "dga60ut51";
const UPLOAD_PRESET = "strix-unsigned";

/**
 * Compresses an image file before upload if it exceeds a certain size.
 * Uses canvas to resize and compress.
 * @param {File} file 
 * @param {number} quality 0 to 1
 * @param {number} maxWidth 
 * @param {number} maxHeight 
 * @returns {Promise<File>} Compressed file
 */
const compressImage = (file, quality = 0.8, maxWidth = 1920, maxHeight = 1920) => {
    return new Promise((resolve, reject) => {
        // If file is not an image, return original
        if (!file.type.startsWith('image/')) {
            resolve(file);
            return;
        }

        // If file is small enough (< 2MB), return original
        if (file.size < 2 * 1024 * 1024) {
            resolve(file);
            return;
        }

        console.log(`Compressing image: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        console.error('Canvas compression failed');
                        resolve(file); // Fallback to original
                        return;
                    }

                    const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    });

                    console.log(`Compressed to: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
                    resolve(compressedFile);
                }, 'image/jpeg', quality);
            };
            img.onerror = (err) => {
                console.error('Image load error during compression', err);
                resolve(file);
            };
        };
        reader.onerror = (err) => {
            console.error('FileReader error during compression', err);
            resolve(file);
        };
    });
};

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 * Automatically compresses images > 2MB before uploading.
 * @param {File} file - The file object from the input.
 * @returns {Promise<string>} - The HTTPS URL of the uploaded image.
 */
export const uploadImage = async (file) => {
    if (!file) return null;

    try {
        // Compress image before upload
        const fileToUpload = await compressImage(file);

        const formData = new FormData();
        formData.append("file", fileToUpload);
        formData.append("upload_preset", UPLOAD_PRESET);

        // Determine resource type based on file type
        // Default is 'image', but if it's a video, use 'video' or 'auto'
        const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Upload failed");
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
