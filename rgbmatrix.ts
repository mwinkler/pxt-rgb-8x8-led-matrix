enum Emoji {
    Smile = 0,
    Laugh = 1,
    Sad = 2,
    Mad = 3,
    Angry = 4,
    Cry = 5,
    Greedy = 6,
    Cool = 7,
    Shy = 8,
    Awkward = 9,
    Heart = 10,
    SmallHeart = 11,
    BrokenHeart = 12,
    Waterdrop = 13,
    Flame = 14,
    Creeper = 15,
    MadCreeper = 16,
    Sword = 17,
    WoodenSword = 18,
    CrystalSword = 19,
    House = 20,
    Tree = 21,
    Flower = 22,
    Umbrella = 23,
    Rain = 24,
    Monster = 25,
    Crab = 26,
    Duck = 27,
    Rabbit = 28,
    Cat = 29,
    Up = 30,
    Down = 31,
    Left = 32,
    Right = 33,
    SmileFace = 34,
}

enum LedColor {
	Red = 0x00,
	Orange = 0x12,
	Yellow = 0x18,
	Green = 0x52,
	Cyan = 0x7f,
	Blue = 0xaa,
	Purple =0xc3,
	Pink = 0xdc,
	White = 0xfe,
	Black = 0xff,
};

enum Orientation {
    Rotate_0 = 0,
    Rotate_90 = 1,
    Rotate_180 = 2,
    Rotate_270 = 3,
};

//% weight=10 color=#A5825B icon="\uf00a" block="RGB Matrix"
namespace rgbmatrix {
    const GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR = 0x65;

    const I2C_CMD_GET_DEV_ID =		    			0x00; // This command gets device ID information
    const I2C_CMD_DISP_BAR =		    			0x01; // This command displays LED bar
    const I2C_CMD_DISP_EMOJI =		    			0x02; // This command displays emoji
    const I2C_CMD_DISP_NUM =          				0x03; // This command displays number
    const I2C_CMD_DISP_STR =		    			0x04; // This command displays string
    const I2C_CMD_DISP_CUSTOM =		    			0x05; // This command displays user-defined pictures
    const I2C_CMD_DISP_OFF =		    			0x06; // This command cleans the display
    const I2C_CMD_DISP_ASCII =		    			0x07; // not use
    const I2C_CMD_DISP_FLASH =						0x08; // This command displays pictures which are stored in flash
    const I2C_CMD_DISP_COLOR_BAR =          		0x09; // This command displays colorful led bar
    const I2C_CMD_DISP_COLOR_WAVE =         		0x0a; // This command displays built-in wave animation
    const I2C_CMD_DISP_COLOR_CLOCKWISE =    		0x0b; // This command displays built-in clockwise animation
    const I2C_CMD_DISP_COLOR_ANIMATION =       		0x0c; // This command displays other built-in animation
    const I2C_CMD_DISP_COLOR_BLOCK =                0x0d; // This command displays an user-defined color
    const I2C_CMD_STORE_FLASH =						0xa0; // This command stores frames in flash
    const I2C_CMD_DELETE_FLASH =        			0xa1; // This command deletes all the frames in flash

    const I2C_CMD_LED_ON =			    			0xb0; // This command turns on the indicator LED flash mode
    const I2C_CMD_LED_OFF =			    			0xb1; // This command turns off the indicator LED flash mode
    const I2C_CMD_AUTO_SLEEP_ON =	    			0xb2; // This command enable device auto sleep mode
    const I2C_CMD_AUTO_SLEEP_OFF =	    			0xb3; // This command disable device auto sleep mode (default mode)

    const I2C_CMD_DISP_ROTATE =         			0xb4; // This command setting the display orientation
    const I2C_CMD_DISP_OFFSET =         			0xb5; // This command setting the display offset

    const I2C_CMD_SET_ADDR =		    			0xc0; // This command sets device i2c address
    const I2C_CMD_RST_ADDR =		    			0xc1; // This command resets device i2c address
    const I2C_CMD_TEST_TX_RX_ON =       			0xe0; // This command enable TX RX pin test mode
    const I2C_CMD_TEST_TX_RX_OFF =      			0xe1; // This command disable TX RX pin test mode
    const I2C_CMD_TEST_GET_VER =        			0xe2; // This command use to get software version
    const I2C_CMD_GET_DEVICE_UID = 0xf1; // This command use to get chip id
    
    function applyDuration(buffer: Buffer, duration_time: number, durationIndexStart: number) {
        duration_time = duration_time == null ? -1 : duration_time;
        buffer[durationIndexStart] = duration_time & 0xff;
        buffer[durationIndexStart + 1] = (duration_time >> 8) & 0xff;
        buffer[durationIndexStart + 2] = duration_time == null || Number.isNaN(duration_time) ? 1 : 0;
    }

    /**
    * Display emoji on LED matrix.
    * @param emoji Set a number from 0 to 34 for different emoji.
    * @param duration Set the display time(ms) duration (-1 = forever).
    */
    //% blockId=rgbmatrix_display_emoji
    //% block="draw emoji $emoji||duration (ms) $duration"
    //% duration.fieldEditor="numberdropdown"
    //% duration.fieldOptions.decompileLiterals=true
    //% duration.fieldOptions.data='[["Forever", -1],["Never",0],["100 ms",100],["200 ms",200],["500 ms",500],["1 s",1000],["2 s",2000],["5 s",5000]]'
    //% duration.defl='-1'
    //% inlineInputMode=inline
    export function drawEmoji(emoji: Emoji, duration?: number) {
        let data = pins.createBuffer(5);

        data[0] = I2C_CMD_DISP_EMOJI;
        data[1] = emoji;
        
        applyDuration(data, duration, 2);
    
        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }

    /**
    * Display color block on LED matrix with a given rgb color.
    * @param rgb rgb color, such as 0xff0000(red), 0x0000ff(blue)
    * @param duration Set the display time(ms) duration (-1 = forever).
    */
    //% blockId=rgbmatrix_display_color_block
    //% block="display color $rgb||duration (ms) $duration"
    //% rgb.shadow="colorNumberPicker"
    //% duration.fieldEditor="numberdropdown"
    //% duration.fieldOptions.decompileLiterals=true
    //% duration.fieldOptions.data='[["Forever", -1],["Never",0],["100 ms",100],["200 ms",200],["500 ms",500],["1 s",1000],["2 s",2000],["5 s",5000]]'
    //% duration.defl='-1'
    //% inlineInputMode=inline
    export function displayColorBlock(rgb: number, duration?: number) {
        let data = pins.createBuffer(7);

        data[0] = I2C_CMD_DISP_COLOR_BLOCK;
        data[1] = (rgb >> 16) & 0xff;
        data[2] = (rgb >> 8) & 0xff;
        data[3] = rgb & 0xff;

        applyDuration(data, duration, 4);

        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }

    /**
    * Display a string on LED matrix.
    * @param str The string pointer, the maximum length is 28 bytes. String will 
    *		 scroll horizontally when its length is more than 1. The shorter 
    *		 you set the duration time, the faster it scrolls.
    * @param color Set the color of the display, range from 0 to 255. See LedColor for more details.
    * @param duration_time Set the display time(ms) duration.
    * @param forever_flag Set it to true to display forever, or set it to false to display one time.
    */
    //% blockId=rgbmatrix_display_string
    //% block="display string $str||color $color|duration (ms) $duration_time|forever $forever_flag"
    //% duration_time.defl=5000
    //% forever_flag.shadow="toggleOnOff" forever_flag.defl=true
    //% inlineInputMode=inline
    export function displayString(str: string, color: LedColor = LedColor.Red, duration_time: number = 5000, forever_flag: boolean = true) {
        let str_len = Math.min(str.length, 28)
        let data = pins.createBuffer(str_len + 6);

        for (let i = 0; i < str_len; i++) {
            data[i + 6] = str.charCodeAt(i);
        }

        data[0] = I2C_CMD_DISP_STR;
        data[1] = forever_flag ? 1 : 0;
        data[2] = duration_time & 0xff;
        data[3] = (duration_time >> 8) & 0xff;
        data[4] = str_len;
        data[5] = color;

        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }

    /**
    * Display a number(-32768 ~ 32767) on LED matrix.
    * @param str Set the number you want to display on LED matrix. Number(except 0-9)
	*        will scroll horizontally, the shorter you set the duration time, 
	*		 the faster it scrolls. The number range from -32768 to +32767, if 
	*		 you want to display larger number, please use displayString().
    * @param color Set the color of the display, range from 0 to 255. See LedColor for more details.
    * @param duration_time Set the display time(ms) duration.
    * @param forever_flag Set it to true to display forever, or set it to false to display one time.
    */
    //% blockId=rgbmatrix_display_number
    //% block="display number $number||color $color|duration (ms) $duration_time|forever $forever_flag"
    //% duration_time.defl=2000
    //% forever_flag.shadow="toggleOnOff" forever_flag.defl=true
    //% inlineInputMode=inline
    export function displayNumber(number: number, color: LedColor = LedColor.Red, duration_time: number = 2000, forever_flag: boolean = true) {
        let data = pins.createBuffer(7);

        data[0] = I2C_CMD_DISP_NUM;
        data[1] = number & 0xff;
        data[2] = (number >> 8) & 0xff;
        data[3] = duration_time & 0xff;
        data[4] = (duration_time >> 8) & 0xff;
        data[5] = forever_flag ? 1 : 0;
        data[6] = color;

        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }

    /**
    * Display user-defined frames on LED matrix.
    * @param buffer The data pointer. 1 frame needs 64 bytes data. 1 pixel = 1 byte (reduced color palette, see LedColor enum). 
    *        Frames will switch automatically when the frames_number is larger than 1. The shorter 
    *        you set the duration_time, the faster it switches.
    * @param duration_time Set the display time(ms) duration.
    * @param forever_flag Set it to true to display forever, or set it to false to display one time.
    * @param frames_number the number of frames in your buffer. Range from 1 to 5.
    */
    export function displayFrames(buffer: Array<number>, duration_time: number = 0, forever_flag: boolean = true, frames_number: number = 1) {
        let data = pins.createBuffer(72);
        
        if (frames_number <= 0)
            return;
        
        // max 5 frames in storage
        frames_number = Math.min(frames_number, 5);

        data[0] = I2C_CMD_DISP_CUSTOM;
        data[1] = 0x0;
        data[2] = 0x0;
        data[3] = 0x0;
        data[4] = frames_number;

        for (let i = frames_number - 1; i >= 0; i--)
        {
            data[5] = i;
            
            for (let j = 0; j < 64; j++) {
                data[8 + j] = buffer[j + i * 64];
            }
            
            if (i == 0)
            {
                // display when everything is finished.
                data[1] = duration_time & 0xff;
                data[2] = (duration_time >> 8) & 0xff;
                data[3] = forever_flag ? 1 : 0;
            }
            pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
        }
    }

    /**
    * Setting the display orientation.
    * This function can be used before or after display.
    * DO NOT WORK with displayColorWave(), displayClockwise(), displayColorAnimation()
    * @param orientation: DISPLAY_ROTATE_0, DISPLAY_ROTATE_90, DISPLAY_ROTATE_180,
    *  DISPLAY_ROTATE_270, which means the display will rotate 0°, 90°,180° or 270°.
    */
    //% blockId=rgbmatrix_display_orientation
    //% block="set display orientation $orientation"
    export function setDisplayOrientation(orientation: Orientation) {
        let data = pins.createBuffer(2);
        
        data[0] = I2C_CMD_DISP_ROTATE;
        data[1] = orientation;
        
        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }

    /**
     * Display nothing on LED Matrix.     
     * */
    //% blockId=rgbmatrix_display_stop
    //% block="stop display"
    export function stopDisplay() {
        let data = pins.createBuffer(1);
        
        data[0] = I2C_CMD_DISP_OFF;
        
        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }

    /**
     * Setting the display offset of x-axis and y-axis.
	 * This function can be used before or after display.
	 * DO NOT WORK with displayColorWave(), displayClockwise(), displayColorAnimation(),
	 * displayNumber(when number<0 or number>=10), displayString(when more than one character)
     * @param offset_x The display offset value of horizontal x-axis, range from -8 to 8.
     * @param offset_y The display offset value of horizontal y-axis, range from -8 to 8.
     */
    //% blockId=rgbmatrix_display_offset
    //% block="set display offset x $offset_x y $offset_y"
    //% offset_x.min=-8 offset_x.max=8 offset_x.defl=0
    //% offset_y.min=-8 offset_y.max=8 offset_y.defl=0
    export function setDisplayOffset(offset_x: number, offset_y: number) {
        // convert to positive
        offset_x += 8;
        offset_y = offset_y * -1 + 8;
        offset_x = Math.min(16, Math.max(0, offset_x));
        offset_y = Math.min(16, Math.max(0, offset_y));

        let data = pins.createBuffer(3);

        data[0] = I2C_CMD_DISP_OFFSET;
        data[1] = offset_x;
        data[2] = offset_y;

        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }

    /**
     * Display a bar on RGB LED Matrix.
     * @param bar 0 - 32. 0 is blank and 32 is full.
     * @param color Set the color of the display, range from 0 to 255. See LedColor enum for more details.
     * @param duration Set the display time(ms) duration (-1 = forever).
     */
    //% blockId=rgbmatrix_display_bar
    //% block="display bar $bar color $color||duration (ms) $duration"
    //% bar.min=0 bar.max=32
    //% duration.fieldEditor="numberdropdown"
    //% duration.fieldOptions.decompileLiterals=true
    //% duration.fieldOptions.data='[["Forever", -1],["Never",0],["100 ms",100],["200 ms",200],["500 ms",500],["1 s",1000],["2 s",2000],["5 s",5000]]'
    //% duration.defl='-1'
    //% inlineInputMode=inline
    export function displayBar(bar: number, color: LedColor = LedColor.Red, duration?: number) {
        let data = pins.createBuffer(6);
        
        bar = Math.min(bar, 32);
        
        data[0] = I2C_CMD_DISP_BAR;
        data[1] = bar;
        data[5] = color;

        applyDuration(data, duration, 2);

        pins.i2cWriteBuffer(GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR, data);
    }
}