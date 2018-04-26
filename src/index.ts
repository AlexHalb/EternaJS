import * as PIXI from 'pixi.js';
import { Signal, SignalConnection } from "typed-signals";

let app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// create a new Sprite from an image path
let bunny = PIXI.Sprite.fromImage('assets/bunny.png');

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// Listen for animate update
app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny.rotation += 0.1 * delta;
});

function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
        setTimeout(() => {
            resolve(count);
        }, milliseconds);
    });
}

// async function always returns a Promise
async function dramaticWelcome(): Promise<void> {
    console.log("Hello");

    for (let i = 0; i < 5; i++) {
        // await is converting Promise<number> into number
        const count:number = await delay(500, i);
        console.log(count);
    }

    console.log("World!");
}

dramaticWelcome();

let mapTest: Map<string, string> = new Map();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

let sig: Signal<(s: string) => void> = new Signal();
let conn1: SignalConnection = null;
let conn2: SignalConnection = null;
conn1 = sig.connect(s => {
    console.log(`sig1: ${s}`);
    conn2.disconnect();
});
conn2 = sig.connect(s => {
    console.log(`sig2: ${s}`)
});
sig.emit("test");
