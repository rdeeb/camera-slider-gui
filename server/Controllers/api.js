import express from 'express';
import CameraSlider from "../Utils/camera-slider";

const router = express.Router();
const slider = new CameraSlider();

router.get('/', (req, res) => {
    res.json({
        success: 'Camera Slider API'
    });
});

router.get('/parameters', (req, res) => {
    res.json(slider.getParameters());
});

router.put('/parameters', (req, res) => {
    let lastParam = '';

    const params = Object.keys(req.body).every((param) => {
        lastParam = param;
        return slider.setParameter(param, req.body[param]);
    });

    if (!params) {
        res.json({
            error: `The parameter ${lastParam} is not recognized`
        }).status(400);
    } else {
        res.json({
            success: 'ok'
        });
    }
});

router.post('/execute', (req, res) => {
    if (req.body.task !== undefined) {
        slider.execute(req.body.task)
            .then(() => {
                res.json({
                    success: 'ok'
                });
            })
            .catch(err => {
                res.json({
                    error: err
                }).status(400);
            });
    } else {
        return res.json({
            error: 'No task defined'
        }).status(400);
    }
});

export default router;
