class DrawableObject {
    x;
    y;
    scaleFactor;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * function to load an image
     * @param {*} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * function to load an array of images
     * @param {} arr 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    /**
     * function to draw images into the canvas
     * @param {*} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img,
            this.x,
            this.y - this.img.naturalHeight * this.scaleFactor,
            this.img.naturalWidth * this.scaleFactor,
            this.img.naturalHeight * this.scaleFactor);
    }

    /**
     * function to draw a frame around objects in the canvas (for debugging)
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            this.width = this.img.naturalWidth * this.scaleFactor;
            this.height = this.img.naturalHeight * this.scaleFactor;
            ctx.rect(
                this.x + this.offset.left * this.offsetFactor,
                this.y - this.height + this.offset.top * this.offsetFactor,
                this.width - this.offset.right * this.offsetFactor,
                this.height - this.offset.top * this.offsetFactor - this.offset.bottom * this.offsetFactor,
            );
            ctx.stroke();
        }
    }
}