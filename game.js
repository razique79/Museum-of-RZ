let canCloseMessage = false;
let tapHint;
let interactionHint;
let music;
let finalHeart;
let finalMessageShown = false;
let room3Orb1;
let room3Orb2;
let room3Orb3;

let room3Orb1Collected = false;
let room3Orb2Collected = false;
let room3Orb3Collected = false;

let room3DoorUnlocked = false;
let room2Orb1;
let room2Orb2;

let room2Orb1Collected = false;
let room2Orb2Collected = false;

const config = {
type: Phaser.AUTO,
width: window.innerWidth,
height: window.innerHeight,
parent: 'game-container',


physics: {
    default: 'arcade'
},

scene: {
    preload,
    create,
    update
}


};

const game = new Phaser.Game(config);

let player;
let background;
let cursors;
let hKey;

let currentRoom = 1;

let star;
let starCollected = false;
let doorUnlocked = false;

let helpPanel;
let helpText;

let messageBox;
let messageText;

let upBtn, downBtn, leftBtn, rightBtn;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;



function preload() {


this.load.image('room1', 'room1.png');
this.load.image('room2', 'room2.png');
this.load.image('room3', 'room3.png');
this.load.image('finalroom', 'finalroom.png');
this.load.image('player', 'player.png');
this.load.image('petal', 'petal.png');
//this.load.audio('bgmusic', 'music.mp3');


}

function create() {


// Background
background = this.add.image(0, 0, 'room1');
background.setOrigin(0, 0);

background.displayWidth = this.sys.game.config.width;
background.displayHeight = this.sys.game.config.height;

// Player
player = this.physics.add.sprite(
    200,
    this.sys.game.config.height - 250,
    'player'
);

player.setScale(0.30);

// Controls
cursors = this.input.keyboard.createCursorKeys();
hKey = this.input.keyboard.addKey('H');

// Room 1 Orb
star = this.add.circle(
    900,
    430,
    18,
    0xffd700
);

star.setStrokeStyle(4, 0xffffaa);

this.tweens.add({
    targets: star,
    alpha: 0.4,
    scale: 1.4,
    duration: 900,
    yoyo: true,
    repeat: -1
});

// Hint
interactionHint = this.add.text(
    20,
    20,
    "Collect the glowing memory ⭐",
    {
        font: "24px Georgia",
        color: "#fff5d6",
        backgroundColor: "#00000088",
        padding: { x: 10, y: 8 }
    }
);

// Guide
helpPanel = this.add.rectangle(
    this.sys.game.config.width / 2,
    this.sys.game.config.height / 2,
    550,
    320,
    0x120d18,
    0.95
);

helpPanel.setStrokeStyle(3, 0xd4af37);
helpPanel.setVisible(false);

helpText = this.add.text(
    this.sys.game.config.width / 2,
    this.sys.game.config.height / 2,


`✨ The Museum of Us ✨

Welcome, ZAHRA ❤️

⬅️ ➡️ ⬆️ ⬇️ Move

Collect Memory Orbs ⭐

Press SPACE to close memories ❤️`,


    {
        font: "26px Georgia",
        color: "#fff5d6",
        align: "center"
    }
);

helpText.setOrigin(0.5);
helpText.setVisible(false);

// Memory Box
messageBox = this.add.rectangle(
    this.sys.game.config.width / 2,
    this.sys.game.config.height / 2,
    850,
    500,
    0x1b1625,
    0.97
);

messageBox.setStrokeStyle(4, 0xd4af37);
messageBox.setVisible(false);

messageText = this.add.text(
    this.sys.game.config.width / 2,
    this.sys.game.config.height / 2,
    "",
    {
        font: "28px Georgia",
        color: "#fff5d6",
        align: "center",
        wordWrap: { width: 700 }
    }
);

messageText.setOrigin(0.5);
messageText.setVisible(false);

tapHint = this.add.text(
    this.sys.game.config.width / 2,
    this.sys.game.config.height - 80,
    "Tap anywhere to continue ❤️",
    {
        font: "22px Georgia",
        color: "#ffd700"
    }
);

tapHint.setOrigin(0.5);
tapHint.setVisible(false);
    this.sys.game.config.width / 2,
    this.sys.game.config.height / 2,
    "",
    {
        font: "28px Georgia",
        color: "#fff5d6",
        align: "center",
        wordWrap: { width: 700 }
    }

//if (this.cache.audio.exists('bgmusic')) {

    //music = this.sound.add('bgmusic', {
       // volume: 0.25,
       // loop: true
   // });

    music.play();
//}
messageText.setOrigin(0.5);
messageText.setVisible(false);

for (let i = 0; i < 30; i++) {

    let firefly = this.add.circle(
        Phaser.Math.Between(0, this.sys.game.config.width),
        Phaser.Math.Between(0, this.sys.game.config.height),
        2,
        0xffff99
    );

    firefly.alpha = 0.7;

    this.tweens.add({
        targets: firefly,
        y: firefly.y - 150,
        alpha: 0,
        duration: Phaser.Math.Between(5000, 9000),
        repeat: -1
    });
}
// MOBILE CONTROLS

leftBtn = this.add.text(
    50,
    this.sys.game.config.height - 100,
    "⬅️",
    { font: "50px Arial" }
).setInteractive();

rightBtn = this.add.text(
    170,
    this.sys.game.config.height - 100,
    "➡️",
    { font: "50px Arial" }
).setInteractive();

upBtn = this.add.text(
    110,
    this.sys.game.config.height - 170,
    "⬆️",
    { font: "50px Arial" }
).setInteractive();

downBtn = this.add.text(
    110,
    this.sys.game.config.height - 40,
    "⬇️",
    { font: "50px Arial" }
).setInteractive();

leftBtn.on('pointerdown', () => moveLeft = true);
leftBtn.on('pointerup', () => moveLeft = false);

rightBtn.on('pointerdown', () => moveRight = true);
rightBtn.on('pointerup', () => moveRight = false);

upBtn.on('pointerdown', () => moveUp = true);
upBtn.on('pointerup', () => moveUp = false);

downBtn.on('pointerdown', () => moveDown = true);
downBtn.on('pointerup', () => moveDown = false);
this.input.on('pointerup', () => {

    if (messageBox.visible) {

        messageBox.setVisible(false);
        messageText.setVisible(false);

    }
});
}
this.input.on('pointerup', () => {

    if (messageBox.visible && canCloseMessage) {

        messageBox.setVisible(false);
        messageText.setVisible(false);
    }
});

function update() {
player.setVelocity(0);

// Movement
player.setVelocity(0);

if (cursors.left.isDown || moveLeft)
    player.setVelocityX(-250);

if (cursors.right.isDown || moveRight)
    player.setVelocityX(250);

if (cursors.up.isDown  || moveUp)
    player.setVelocityY(-250);

if (cursors.down.isDown || moveDown)
    player.setVelocityY(250);

// ROOM 1 ORB
if (currentRoom === 1 && !starCollected) {

    const d = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        star.x,
        star.y
    );

    if (d < 50) {

        starCollected = true;
        doorUnlocked = true;

        star.destroy();

        interactionHint.setText(
            "Door Unlocked 🚪❤️"
        );

        messageText.setText(


`Before you my days followed
the same routine

Then, without realizing it,
you slowly became part
of my everyday thoughts

Somewhere along the way,
you became someone very special ❤️`
);


        messageBox.setVisible(true);
        messageText.setVisible(true);
        canCloseMessage = false;

this.time.delayedCall(1000, () => {
    canCloseMessage = true;
});

        
    }
}

// ROOM 2 ORB 1
if (
    currentRoom === 2 &&
    room2Orb1 &&
    !room2Orb1Collected
) {

    const d1 = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        room2Orb1.x,
        room2Orb1.y
    );

    if (d1 < 50) {

        room2Orb1Collected = true;
        room2Orb1.destroy();

        messageText.setText(


`Some of my happiest moments
started with a simple notification
from you

It's strange how something so small
could brighten an entire day ❤️`
);


        messageBox.setVisible(true);
        messageText.setVisible(true);
        canCloseMessage = false;

this.time.delayedCall(1000, () => {
    canCloseMessage = true;
});
         
    }
}

// ROOM 2 ORB 2
if (
    currentRoom === 2 &&
    room2Orb2 &&
    !room2Orb2Collected
) {

    const d2 = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        room2Orb2.x,
        room2Orb2.y
    );

    if (d2 < 50) {

        room2Orb2Collected = true;
        room2Orb2.destroy();

        messageText.setText(


`You became my comfort in a way
I never expected😭

Not because you solve every problem
or make every difficult day disappear

but because your presence alone
makes things feel easier❤️

Knowing you're there,
knowing I can talk to you,
laugh with you,
and share things with you,

brings a kind of peace
that is hard to describe ❤️`
);


        messageBox.setVisible(true);
        messageText.setVisible(true);
        canCloseMessage = false;

this.time.delayedCall(1000, () => {
    canCloseMessage = true;
});
         
    }
}



    // ROOM 3 ORB 1
if (
    currentRoom === 3 &&
    room3Orb1 &&
    !room3Orb1Collected
) {

    const d = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        room3Orb1.x,
        room3Orb1.y
    );

    if (d < 100) {

        room3Orb1Collected = true;
        room3Orb1.destroy();

        messageText.setText(

`People often say that the world is full of beautiful things...
beautiful places beautiful sunsets
and endless flowers in a garden
But what would I do with an entire garden
if my favorite flower wasn't there?💝🌷
Because no matter how beautiful everything else may be
without YOU it all feels incomplete
You became the part of my life
 now whenever you're away
even the happiest moments feel a little emptier
Because the truth is...
I don't need the whole garden
I just need my favorite flower
And for me that flower will always be YOU ZARUUUU ❤️🌸`
        );

        messageBox.setVisible(true);
        messageText.setVisible(true);
        canCloseMessage = false;

this.time.delayedCall(1000, () => {
    canCloseMessage = true;
});
       
        
    }
}

// ROOM 3 ORB 2
if (
    currentRoom === 3 &&
    room3Orb2 &&
    !room3Orb2Collected
) {

    const d = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        room3Orb2.x,
        room3Orb2.y
    );

    if (d < 100) {

        room3Orb2Collected = true;
        room3Orb2.destroy();

        messageText.setText(

`Out of everything you've given me,

I think the thing I'm most grateful for
is how you've made ordinary moments
feel special......

The memories I treasure most
aren't grand events or perfect days

They're the simple conversations,
random jokes,
late-night talks,
and little moments that became unforgettable

simply because they happened with YOU ❤️`
        );

        messageBox.setVisible(true);
        messageText.setVisible(true);
        canCloseMessage = false;

this.time.delayedCall(1000, () => {
    canCloseMessage = true;
});
        
    }
}


// ROOM 3 ORB 3
if (
    currentRoom === 3 &&
    room3Orb3 &&
    !room3Orb3Collected
) {

    const d = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        room3Orb3.x,
        room3Orb3.y
    );

    if (d < 100) {
         room3Orb3Collected = true;
        console.log("ORB 3 TOUCHED");

       
        room3Orb3.destroy();

        messageText.setText(

`If there's one thing this museum taught me,

it's that memories aren't special
because of places

They're special because of people

And when I look back at all these memories,

I realize that what made them truly special
wasn't the conversations,
the jokes,
or even the moments themselves

It was YOU💋

Thank you for becoming
such an important part of my story ❤️`
        );

        messageBox.setVisible(true);
        messageText.setVisible(true);
        canCloseMessage = false;

this.time.delayedCall(1000, () => {
    canCloseMessage = true;
});
         
        room3Orb3Collected = true;

        room3DoorUnlocked = true;

interactionHint.setText(
    "The Final Door Awaits ❤️"
);
    }
}
    

// FINAL HEART
if (
    currentRoom === 4 &&
    finalHeart &&
    !finalMessageShown
) {

    const d = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        finalHeart.x,
        finalHeart.y
    );

    if (d < 40) {

        finalMessageShown = true;
        finalMessageShown = true;





        messageText.setText(

`Thank you for walking through
this museum with me❤️
Every room,
every memory,
every laugh,
and every little moment
led me to one simple truth

Some people enter our lives quietly...
and somehow end up changing everything...

You became my favorite memory,
my comfort,
and a part of my story
I never want to lose

And if this museum has taught me anything...
it's that no matter where life takes us,
a part of my heart
will always belong to YOU❤️

✨ Our story doesn't end here... ✨`


        );

        messageBox.setVisible(true);
        messageText.setVisible(true);
        canCloseMessage = false;

this.time.delayedCall(1000, () => {
    canCloseMessage = true;
});
        

        interactionHint.setText(
            "The End ❤️"
        );
    }
}

// Close memories
if (
    Phaser.Input.Keyboard.JustDown(cursors.space) &&
    messageBox.visible
) {

    messageBox.setVisible(false);
    messageText.setVisible(false);
   
    if (currentRoom === 4) {

    

    this.cameras.main.flash(1000, 255, 255, 255);

    this.time.delayedCall(1500, () => {

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 120,
            "✨ OUR STORY CONTINUES ✨",
            {
                font: "42px Georgia",
                color: "#ffd700",
                stroke: "#ffffff",
                strokeThickness: 4
            }
        ).setOrigin(0.5);

        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "I LOVEEEEEE UUUUUU\nZARUUUUUU 😘❤️",
            {
                font: "64px Georgia",
                color: "#ff4d6d",
                stroke: "#ffffff",
                strokeThickness: 6,
                align: "center"
            }
        ).setOrigin(0.5);
       for (let i = 0; i < 150; i++) {

    let particle = this.add.circle(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2,
        Phaser.Math.Between(3, 8),
        Phaser.Display.Color.RandomRGB().color
    );

    this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-800, 800),
        y: particle.y + Phaser.Math.Between(-600, 600),
        alpha: 0,
        scale: 0,
        duration: Phaser.Math.Between(1500, 3000),
        ease: 'Cubic.easeOut'
    });
}
    

    });

}

    

    }


// Guide
if (Phaser.Input.Keyboard.JustDown(hKey)) {

    const visible = !helpPanel.visible;

    helpPanel.setVisible(visible);
    helpText.setVisible(visible);
}

// ROOM 1 -> ROOM 2
if (
    currentRoom === 1 &&
    doorUnlocked &&
    player.x > 1000
) {

    currentRoom = 2;

    this.cameras.main.fadeOut(600,0,0,0);

    this.time.delayedCall(600, () => {

        background.setTexture('room2');

        if (star)
            star.destroy();

        room2Orb1 = this.add.circle(
            350,
            250,
            18,
            0xffd700
        );

        room2Orb1.setStrokeStyle(4,0xffffaa);

        room2Orb2 = this.add.circle(
            900,
            300,
            18,
            0xffd700
        );

        room2Orb2.setStrokeStyle(4,0xffffaa);

        this.tweens.add({
            targets: [room2Orb1, room2Orb2],
            alpha: 0.4,
            scale: 1.4,
            duration: 900,
            yoyo: true,
            repeat: -1
        });

        player.x = 100;
        player.y = this.sys.game.config.height - 100;

        interactionHint.setText(
            "Collect 2 Memories ⭐⭐"
        );

        this.cameras.main.fadeIn(600,0,0,0);

    });
}

// ROOM 2 -> ROOM 3

if (
currentRoom === 2 &&
room2Orb1Collected &&
room2Orb2Collected &&
player.x > 1000
) {


currentRoom = 3;

this.cameras.main.fadeOut(600, 0, 0, 0);

this.time.delayedCall(600, () => {

    background.setTexture('room3');

    if (room2Orb1)
        room2Orb1.destroy();

    if (room2Orb2)
        room2Orb2.destroy();

    // Create Room 3 Orbs

    room3Orb1 = this.add.circle(
        250,
        250,
        18,
        0xffd700
    );

    room3Orb2 = this.add.circle(
        700,
        450,
        18,
        0xffd700
    );

    room3Orb3 = this.add.circle(
        850,
        250,
        18,
        0xffd700
    );

    room3Orb1.setStrokeStyle(4, 0xffffaa);
    room3Orb2.setStrokeStyle(4, 0xffffaa);
    room3Orb3.setStrokeStyle(4, 0xffffaa);

    this.tweens.add({
        targets: [
            room3Orb1,
            room3Orb2,
            room3Orb3
        ],
        alpha: 0.4,
        scale: 1.4,
        duration: 900,
        yoyo: true,
        repeat: -1
    });

    player.x = 100;
    player.y = this.sys.game.config.height - 100;

    interactionHint.setText(
        "Collect 3 Memories ⭐⭐⭐"
    );

    this.cameras.main.fadeIn(600, 0, 0, 0);


});

}
// ROOM 3 -> FINAL ROOM
if (
    currentRoom === 3 &&
    room3DoorUnlocked &&
    player.x > 900
)
{

    currentRoom = 4;

    this.cameras.main.fadeOut(600, 0, 0, 0);

    this.time.delayedCall(600, () => {

        background.setTexture('finalroom');
        this.time.addEvent({
    delay: 5000,
    loop: true,
    callback: () => {

        let shootingStar = this.add.rectangle(
            -100,
            Phaser.Math.Between(50, 300),
            80,
            3,
            0xffffff
        );

        this.tweens.add({
            targets: shootingStar,
            x: this.sys.game.config.width + 200,
            y: shootingStar.y + 200,
            alpha: 0,
            duration: 1200,
            onComplete: () => shootingStar.destroy()
        });

    }
});
this.time.addEvent({
    delay: 5000,
    loop: true,
    callback: () => {

        let shootingStar = this.add.rectangle(
            -100,
            Phaser.Math.Between(50, 300),
            80,
            3,
            0xffffff
        );

        this.tweens.add({
            targets: shootingStar,
            x: this.sys.game.config.width + 200,
            y: shootingStar.y + 200,
            alpha: 0,
            duration: 1200,

            onComplete: () => {
                shootingStar.destroy();
            }
        });

    }
});
        for (let i = 0; i < 120; i++) {

    let star = this.add.circle(
        Phaser.Math.Between(0, this.sys.game.config.width),
        Phaser.Math.Between(0, this.sys.game.config.height),
        Phaser.Math.Between(1, 3),
        0xffffff
    );

    star.alpha = Phaser.Math.FloatBetween(0.2, 1);

    this.tweens.add({
        targets: star,
        alpha: 0.1,
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1
    });
}

        if (room3Orb1) room3Orb1.destroy();
        if (room3Orb2) room3Orb2.destroy();
        if (room3Orb3) room3Orb3.destroy();

        finalHeart = this.add.circle(
            this.sys.game.config.width / 2,
            350,
            35,
            0xff4d6d
        );

        finalHeart.setStrokeStyle(5, 0xffffff);

        this.tweens.add({
            targets: finalHeart,
            scale: 1.4,
            alpha: 0.5,
            duration: 900,
            yoyo: true,
            repeat: -1
        });

        player.x = 50;
        player.y = this.sys.game.config.height - 100;

        interactionHint.setText(
            "Walk to the heart ❤️"
        );
        for (let i = 0; i < 20; i++) {

    let petal = this.add.image(
        Phaser.Math.Between(0, this.sys.game.config.width),
        Phaser.Math.Between(-600, 0),
        'petal'
    );

    petal.setScale(0.08);

    this.tweens.add({
        targets: petal,
        y: this.sys.game.config.height + 100,
        x: petal.x + Phaser.Math.Between(-100, 100),
        angle: 360,
        duration: Phaser.Math.Between(7000, 12000),
        repeat: -1
    });
}
        finalMessageShown = false;

        this.cameras.main.fadeIn(600, 0, 0, 0);
    });
}


}


