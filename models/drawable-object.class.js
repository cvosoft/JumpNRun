class DrawableObject {

    x;
    y;
    scaleFactor;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    draw(ctx) {
        //ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //this.scaleFactor = 1;
        //ctx.drawImage(this.img, this.x, this.y, this.img.naturalWidth * this.scaleFactor, this.img.naturalHeight * this.scaleFactor);


        ctx.drawImage(this.img,
            this.x,
            this.y - this.img.naturalHeight * this.scaleFactor,  // Höhe wird abgezogen
            this.img.naturalWidth * this.scaleFactor,
            this.img.naturalHeight * this.scaleFactor);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            //ctx.rect(this.x, this.y, this.width, this.height);
            // this.y - this.img.naturalHeight * this.scaleFactor,
            ctx.rect(
                this.x + this.offset.right,
                this.y - this.img.naturalHeight * this.scaleFactor + this.offset.top,
                this.img.naturalWidth * this.scaleFactor + this.offset.left,
                this.img.naturalHeight * this.scaleFactor + this.offset.bottom,
                //this.x + this.offset.right, 
                //this.y - this.img.naturalHeight * this.scaleFactor + this.offset.top,
                //this.img.naturalWidth * this.scaleFactor - this.offset.left,
                //this.img.naturalHeight * this.scaleFactor - this.offset.bottom
            );

            ctx.stroke();

            //ctx.font = "15px serif";
            //ctx.fillText(`${Math.round(this.x)}/${Math.round(this.y)}`, this.x, this.y);
            //ctx.fillText(`${Math.round(this.x)}/${Math.round(this.y - this.img.naturalHeight * this.scaleFactor)}`, this.x, this.y - this.img.naturalHeight * this.scaleFactor);

        }


    }
}