var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Word = require('../models').Word;
var async = require('async');

function getSentenceScore (sentence){

	new_sentence = sentence.replace(/[^\w\s]/gi, '');
	console.log(new_sentence);
	//need to filter the sentence
	var words= new_sentence.split(' ');
	var scores = {
			'afraid': 0,
			'amused': 0,
			'angry': 0,
			'annoyed': 0,
			'dont_care': 0,
			'happy': 0,
			'inspired': 0,
			'sad': 0
		}
	
	function wordScore (word, callback){
		Word.findOne({word: word}, function(error, wordFromDb){
			if (error) throw error;
			if(wordFromDb != null){
				scores.afraid = scores.afraid + Number(wordFromDb.afraid);
				scores.amused = scores.amused + Number(wordFromDb.amused);
				scores.angry = scores.angry + Number(wordFromDb.angry);
				scores.annoyed = scores.annoyed + Number(wordFromDb.annoyed);
				scores.dont_care = scores.dont_care + Number(wordFromDb.dont_care);
				scores.happy = scores.happy + Number(wordFromDb.happy);
				scores.inspired = scores.inspired + Number(wordFromDb.inspired);
				scores.sad = scores.sad + Number(wordFromDb.sad);
			}
			callback(error, scores)
		})

	}
	
	async.map(words, wordScore, function(err, data){
		console.log('finished the loop');
		console.log( scores);
		return scores;
	})

 }


module.exports = getSentenceScore;

var phrase = "What are you doing in here get out"
console.log(phrase);
getSentenceScore(phrase);

var phrase2 = "you &^are an asshole @#4I hate you..."
console.log(phrase2);
getSentenceScore(phrase2);