module objects {
    export class Roll extends objects.GameObject {
        constructor(imageString:string) {
            super(imageString);
            this.Start();
        }
        public Start(): void {
            this.y = 180;
        }        
        public Update(): void {
        }
        public Reset(): void {
        }
        public Destroy(): void {
        }


    }
}