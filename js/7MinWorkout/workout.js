'use strict';

// we will only put those properties in the scope which are required in the view.
angular.module('7minworkout')
	   .controller('WorkoutController', ['$scope', '$interval', '$location', '$sce', function($scope, $interval, $location, $sce){

	   		//constructor function for creating new objects of type Exercise
	   		//(to create new exercises).
	   		//A constructor is just a normal JS function that starts 
	   		//with a capital letter.
	   		
	   		function Exercise(args){
	   			this.name = args.name;
	   			this.title = args.title;
	   			this.description = args.description;
	   			this.image = args.image;
	   			this.related = {};
	   			this.related.videos = args.videos;
	   			this.nameSound = args.nameSound;
	   			this.procedure = args.procedure;
	   		}

	   		//constructor function for creating new objects of type Workout
	   		// (to create new workouts), which will contain exercises obtained
	   		// from the Exercise constructor. 
	   		
	   		function WorkoutPlan(args){
	   			//Array for all exercises in this workout.
	   			//contains objects of the format:
	   			//{exercise: new Exercise({}), duration: 30 }
	   			this.exercises = []; 
	   			this.name = args.name;
	   			this.title = args.title;
	   			this.restBetweenExercise = args.restBetweenExercise;
	   		}

	   		var restExercise;
	   		var workoutPlan;

	   		// workout starts. its been called in init().
	   		var startWorkout = function(){
	   			// the workout plan is loaded, by creating the workout.
	   			workoutPlan = createWorkout();
	   			// signifies the rest period btw 2 exercises.
	   			// its also treated as an exercise to keep uniformity.
	   			restExercise = {
	   				// of the type Exercise()
	   				details: new Exercise({
	   					name: "rest",
	   					title: "Relax",
	   					description: "Relax a bit!", 
	   					image: "img/rest.png",
	   					videos: ["https://www.youtube.com/embed/5kKr841E_O0"],
	   					procedure: "Just stand still and breathe!" 
	   				}),
	   				// duration of rest.
	   				duration: workoutPlan.restBetweenExercise
	   			};
	   			// calls the first exercise by removing first element
	   			// from exercise array.
	   			startExercise(workoutPlan.exercises.shift());
	   		};

	   		// function to put current exercise and its duration in scope object
	   		var startExercise = function(exercisePlan){
	   			
	   			$scope.currentExercise = exercisePlan;
	   			$scope.currentExerciseDuration = 0;
	   			
	   			// a service of AngularJS to call a method <first arg> 
	   			// after each <second arg> time for total <3rd arg> times.
	   			// so we are incrementing the currentExerciseDuration variable
	   			// for the duration of the current exercise and putting in scope
	   			// to be able to show on the scope.
	   			$interval(function(){
	   				++$scope.currentExerciseDuration;
	   			}, 1000, $scope.currentExercise.duration)
	   			.then(function(){ //a better alternative to using $watch.
	   				var next = getNextExercise(exercisePlan);
	   				if(next){
	   					startExercise(next);
	   				}else{
	   					// console.log("workout complete");
	   					$location.path('/finish');
	   				}
	   			});
	   		};

	   		var getNextExercise = function(currentExercisePlan){
	   			var nextExercise = null;
	   			if(currentExercisePlan === restExercise){
	   				nextExercise = workoutPlan.exercises.shift();
	   			}else{
	   				if(workoutPlan.exercises.length != 0){
	   					nextExercise = restExercise;
	   				}
	   			}
	   			return nextExercise;
	   		};

	   		// $scope.$watch('currentExerciseDuration', function(nVal){
	   		// 	if(nVal == $scope.currentExercise.duration){
	   		// 		var next = getNextExercise($scope.currentExercise);
	   		// 		if(next){
	   		// 			startExercise(next);
	   		// 		}else{
	   		// 			console.log('Workout complete!');
	   		// 		}
	   		// 	}
	   		// });

	   		$scope.trustSrc = function(src) {
			    return $sce.trustAsResourceUrl(src);
			}

	   		// created workout plan which includes 12 exercises, name, title and rest time.
	   		var createWorkout = function(){
	   			var workout = new WorkoutPlan({
	   				name: "7minWorkout",
	   				title: "7 Minute Workout",
	   				restBetweenExercise: 10
	   			});

	   			//Exercise: 1
	   			workout.exercises.push({
	   				details: new Exercise({
	   					name: "jumpingJacks",
	   					title: "Jumping Jacks",
	   					description:"Jumping Jacks",
	   					image: "img/JumpingJacks.png",
	   					videos: ["//www.youtube.com/embed/dmYwZH_BNd0"],
	   					//variations: [],
	   					procedure: "Assume an erect position, with feet together and arms at your side.\
                            Slightly bend your knees, and propel yourself a few inches into the air.\
                            While in air, bring your legs out to the side about shoulder width or slightly wider.\
                            As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.\
                            Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent"
	   				}),
	   				duration: 30
	   			});

	   			//Exercise: 2
	   			workout.exercises.push({
		            details: new Exercise({
		                  name: "wallSit",
		                  title: "Wall Sit",
		                  description: "Wall Sit.",
		                  image: "img/wallsit.png",
		                  videos: [],
		                  //variations: [],
		                  procedure: "Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.\
                              Then, keeping your back against the wall, lower your hips until your knees form right angles."
		              }),
		              duration: 30
		        });

		        //Exercise: 3
		        workout.exercises.push({
		            details: new Exercise({
		                name: "pushUp",
		                title: "Push Up",
		                description: "Discription about pushup.",
		                image: "img/Pushup.png",
		                videos: ["https://www.youtube.com/embed/OicNTT2xzMI"],
		                variations: ["Planche push-ups", "Knuckle push-ups", "Maltese push-ups", "One arm versions"],
		                procedure: "Lie prone on the ground with hands placed as wide or slightly wider than shoulder width. \
                              Keeping the body straight, lower body to the ground by bending arms at the elbows. \
                              Raise body up off the ground by extending the arms."
		              }),
		              duration: 30
		        });

		        //Exercise: 4
	            workout.exercises.push({
		            details: new Exercise({
		                name: "crunches",
		                title: "Abdominal Crunches",
		                description: "Abdominal Crunches.",
		                image: "img/crunches.png",
		                videos: [],
		                //variations: [],
		                procedure: "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.\
                              Place your hands behind your head so your thumbs are behind your ears.\
                              Hold your elbows out to the sides but rounded slightly in.\
                              Gently pull your abdominals inward.\
                              Curl up and forward so that your head, neck, and shoulder blades lift off the floor.\
                              Hold for a moment at the top of the movement and then lower slowly back down."
		            }),
		            duration: 30
		        });

		        //Exercise: 5
		        workout.exercises.push({
		            details: new Exercise({
		                name: "stepUpOntoChair",
		                title: "Step Up Onto Chair",
		                description: "Step Up Onto Chair.",
		                image: "img/stepUpOntoChair.jpeg",
		                videos: [],
		                //variations: [],
		                procedure: "Position your chair in front of you.\
                              Stand with your feet about hip width apart, arms at your sides.\
                              Step up onto the seat with one foot, pressing down while bringing your other foot up next to it. \
                              Step back with the leading foot and bring the trailing foot down to finish one step-up."
		            }),
		            duration: 30
		        });

		        //Exercise: 6
		        workout.exercises.push({
		            details: new Exercise({
		                name: "squat",
		                title: "Squat",
		                description: "Squat.",
		                image: "img/squat.png",
		                videos: [],
		                //variations: [],
		                procedure: "Stand with your head facing forward and your chest held up and out.\
                              Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.\
                              Sit back and down like you're sitting into a chair. Keep your head facing straight as your upper body bends forward a bit. Rather than allowing your back to round, let your lower back arch slightly as you go down.\
                              Lower down so your thighs are parallel to the floor, with your knees over your ankles. Press your weight back into your heels.\
                              Keep your body tight, and push through your heels to bring yourself back to the starting position."
		            }),
		            duration: 30
		        });

		        //Exercise: 7
		        workout.exercises.push({
		            details: new Exercise({
		                name: "tricepdips",
		                title: "Tricep Dips On Chair",
		                description: "Tricep Dips On Chair.",
		                image: "img/tricepdips.jpg",
		                videos: [],
		                //variations: [],
		                procedure: "Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.\
                              Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.\
                              Without moving your legs, bring your glutes forward off the chair.\
                              Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position."
		            }),
		            duration: 30
		        });

		        //Exercise: 8
		        workout.exercises.push({
		            details: new Exercise({
		                name: "plank",
		                title: "Plank",
		                description: "Plank.",
		                image: "img/Plank.png",
		                videos: [],
		                //variations: [],
		                procedure: "Get into pushup position on the floor.\
                              Bend your elbows 90 degrees and rest your weight on your forearms.\
                              Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.\
                              Hold this position."
		            }),
		            duration: 30
		        });

		        //Exercise: 9
		        workout.exercises.push({
		            details: new Exercise({
		                name: "highKnees",
		                title: "High Knees",
		                description: "High Knees.",
		                image: "img/highknees.png",
		                videos: [],
		                //variations: [],
		                procedure: "Start standing with feet hip-width apart. \
                              Do inplace jog with your knees lifting as much as possible towards your chest."
		            }),
		            duration: 30
		        });

		        //Exercise: 10
		        workout.exercises.push({
		            details: new Exercise({
		                name: "lunges",
		                title: "Lunges",
		                description: "Lunges.",
		                image: "img/lunges.png",
		                videos: [],
		                //variations: [],
		                procedure: "Stand erect with your feet about one shoulder width apart.\
                              Put your hands on your hips, keep your back as straight as possible, relax your shoulders and keep your eyes facing directly ahead.\
                              Take a large step forward with one leg.\
                              As you step forward, lower your hips and bend your knees until they both form 90 degree angles.\
                              Return to starting position.\
                              Repeat with your alternate leg."
		            }),
		            duration: 30
		        });

		        //Exercise: 11
		        workout.exercises.push({
		            details: new Exercise({
		                name: "pushupNRotate",
		                title: "Pushup And Rotate",
		                description: "Pushup And Rotate.",
		                image: "img/pushupNRotate.jpg",
		                videos: [],
		                //variations: [],
		                procedure: "Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.\
                              Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling."
		            }),
		            duration: 30
		        });

		        //Exercise: 12
		        workout.exercises.push({
		            details: new Exercise({
		                name: "sidePlank",
		                title: "Side Plank",
		                description: "Side Plank.",
		                image: "img/sideplank.png",
		                videos: [],
		                //variations: [],
		                procedure: "Lie on your side, in a straight line from head to feet, resting on your forearm.\
                              Your elbow should be directly under your shoulder.\
                              With your abdominals gently contracted, lift your hips off the floor, maintaining the line.\
                              Keep your hips square and your neck in line with your spine. Hold the position."
		            }),
		            duration: 30
		        });
		        return workout;
	   		};

	   		var init = function(){
	   			startWorkout();
	   		};

	   		init();

	   }]);