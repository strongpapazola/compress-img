const sharp = require('sharp');
const fs = require('fs');

function getFormattedSize(bytes, factor = 1024, suffix = 'B') {
    const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z'];
    let index = 0;
    while (bytes >= factor && index < units.length - 1) {
        bytes /= factor;
        index++;
    }
    return `${bytes.toFixed(2)}${units[index]}${suffix}`;
}

async function compressImg(imagePath, options = {}) {
    try {
        const { newRatio = 1.0, quality = 90, width, height, toJpg = true } = options;

        const metadata = await sharp(imagePath).metadata();
        const originalSize = fs.statSync(imagePath).size;
        console.log("[*] Image dimensions:", metadata.width, "x", metadata.height);
        console.log("[*] Size before compression:", getFormattedSize(originalSize));

        let transformer = sharp(imagePath);
        if (newRatio !== 1.0) {
            transformer = transformer.resize(Math.round(metadata.width * newRatio), Math.round(metadata.height * newRatio));
        } else if (width && height) {
            transformer = transformer.resize(width, height);
        }

        const format = toJpg ? 'jpeg' : metadata.format;
        const newFilename = `${imagePath.split('.').slice(0, -1).join('.')}_compressed.${toJpg ? 'jpg' : metadata.format}`;

        await transformer
            .toFormat(format, { quality: quality })
            .toFile(newFilename);

        const newSize = fs.statSync(newFilename).size;
        console.log("[+] New file saved:", newFilename);
        console.log("[+] Size after compression:", getFormattedSize(newSize));
        console.log(`[+] Image size change: ${((newSize - originalSize) / originalSize * 100).toFixed(2)}% of the original image size.`);
    } catch (error) {
        console.error("Error processing image:", error);
    }
}

// Example usage
compressImg('add_user_certnexus_1.png', {
    newRatio: 0.5,
    quality: 50,
    toJpg: true
});
