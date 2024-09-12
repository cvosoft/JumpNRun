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
            this.y - this.img.naturalHeight * this.scaleFactor,
            this.img.naturalWidth * this.scaleFactor,
            this.img.naturalHeight * this.scaleFactor);
    }


    drawFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            //ctx.rect(this.x, this.y, this.width, this.height);
            // this.y - this.img.naturalHeight * this.scaleFactor,
            ctx.rect(
                this.x + 65,
                this.y - 15,
                this.img.naturalWidth * this.scaleFactor - 130,
                0);

            ctx.stroke();
        }
        if (this instanceof Chicken || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            //ctx.rect(this.x, this.y, this.width, this.height);
            // this.y - this.img.naturalHeight * this.scaleFactor,
            ctx.rect(
                this.x,
                this.y - this.img.naturalHeight * this.scaleFactor,
                this.img.naturalWidth * this.scaleFactor,
                0);

            ctx.stroke();
        }
    }
}