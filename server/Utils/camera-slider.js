import UdpClient from "./udp-client";

const MAX_RAIL_SIZE = 700; // This is my rail size, you can change it to match your values
const MIN_RAIL_SIZE = 10; // This is my rail size, you can change it to match your values
const MAX_SPEED = 100; // I've tested this to be the fastest I could go
const M_PER_S = 0.03157895; // Our velocity to calculate our time

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

export default class CameraSlider {
    constructor() {
        this.client = new UdpClient();
        this.travel = 600; // APP CHANGE: instead of rail size, we will define a distance to travel
        this.speed = 25;
        this.obj_x = 300;
        this.obj_y = 400;
    }

    getParameters() {
        return {
            'max_size': MAX_RAIL_SIZE,
            'max_speed': MAX_SPEED,
            'm_per_s': M_PER_S,
            'travel': this.travel,
            'speed': this.speed,
            'obj_x': this.obj_x,
            'obj_y': this.obj_y
        }
    }

    setParameter(param, value) {
        switch(param) {
            case 'travel':
                this.travel = clamp(parseInt(value), MIN_RAIL_SIZE, MAX_RAIL_SIZE);
                return true;
            case 'speed':
                this.speed = clamp(parseInt(value), 1, MAX_SPEED);
                return true;
            case 'obj_x':
                this.obj_x = parseInt(value);
                return true;
            case 'obj_y':
                this.obj_y = parseInt(value);
                return true;
            default:
                return false;
        }
    };

    execute(task) {
        const num = clamp(parseInt(task), 0, 5);
        return this.client.send(`J${num}CS`, this.travel, this.obj_x, this.obj_y, this.speed);
    }
}
