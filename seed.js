var async = require('async');
var mongoose = require('mongoose');
var fs = require('fs');
var models = require('./models');
var Word = models.Word;

fs.readFile('./db_seed/depechemood_v1.0/depechemood_normfreq.txt', 'utf-8', function(err, data){
	if(err) throw err;

	var useData = data.split('\n');
	for(var a=1, len=useData.length; a<len; a++){
		var set = useData[a].split('\t');
		var obj = { 
			'word': set[0].split('#n')[0],
			'afraid': set[1],
			'amused': set[2],
			'angry': set[3],
			'annoyed': set[4],
			'dont_care': set[5],
			'happy': set[6],
			'inspired': set[7],
			'sad': set[8]
		}
		var b = new Word(obj);
		b.save();
	}
	console.log('finished seeding the database');
});








// mongoose.connection.on('open', function() {
//     mongoose.connection.db.dropDatabase(function() {

//         console.log("Dropped old data, now inserting data");
//         async.each(Object.keys(data),
//             function(modelName, outerDone) {
//                 async.each(data[modelName],
//                     function(d, innerDone) {
//                         models[modelName].create(d, innerDone);
//                     },
//                     outerDone
//                 );
//             },
//             function(err) {
//                 console.log("Finished inserting data");
//                 console.log("Control-C to quit");
//             }
//         );
//     });
// });