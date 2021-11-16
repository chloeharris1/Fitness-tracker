// Backend routes
const { Workout } = require("../models");
const router = require("express").Router();

// Get workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }
    }]).then(dbWorkout => {
        // dbWorkout.forEach(workout => {
        //     let total = 0;
        //     workout.exercises.forEach(e => {
        //         total += e.duration;
        //     });
        //     workout.totalDuration = total;
        // });
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

// Add exercise
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
            params.id, { push: { exercises: body } }, { new: true, runValidators: true }
        )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

// Create workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body).then((dbWorkout) => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });

});

// Get aggregate duration
// router.get("/api/workouts", (req, res) => {
//     Workout.aggregate([{
//             $addFields: {
//                 totalDuration: {
//                     $sum: '$exercises.duration',
//                 },
//             },
//         }, ])
//         .then((dbWorkouts) => {
//             res.json(dbWorkouts);
//         })
//         .catch((err) => {
//             res.json(err);
//         });
// });

// Get workouts in range
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        }, ])
        .sort({ _id: -1 })
        .limit(7)
        .then((dbWorkouts) => {
            console.log(dbWorkouts);
            res.json(dbWorkouts);
        });
});

// Delete workout
router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;