mediaQuery = window.matchMedia('(max-width: 424px)') ;

window.onload = function () {
	preloader () ;
	sessionMode () ;
	
//	loadData (0, 0) ;
//	loadQuestionPage () ;
}


/*--------------------------------------------------
LOAD JSON DATA
--------------------------------------------------*/

title = "" ;
icon = "djnd" ;
question = "" ;
optionA = "" ;
optionB = "" ;
optionC = "" ;
optionD = "" ;
answer = "" ;


function loadData (qz, qst) {
	fetch("data.json")
	.then(response => response.json())
	.then(data => {
		title = data.quizzes[qz].title ;
		icon = data.quizzes[qz].icon ;
		question = data.quizzes[qz].questions[qst].question ;
		optionA = data.quizzes[qz].questions[qst].options[0] ;
		optionB = data.quizzes[qz].questions[qst].options[1] ;
		optionC = data.quizzes[qz].questions[qst].options[2] ;
		optionD = data.quizzes[qz].questions[qst].options[3] ;
		answer = data.quizzes[qz].questions[qst].answer ;
		
		loadQuestionPage (title, icon, question, optionA, optionB, optionC, optionD, answer) ;
		/*
		document.write (`
			${title} <br><br>
			${icon} <br><br>
			${question} <br><br>
			${optionA} <br>
			${optionB} <br>
			${optionC} <br>
			${optionD} <br><br>
			${answer} <br>
		`) ;
		*/
	}) ;
}





/*--------------------------------------------------
PRELOADER
--------------------------------------------------*/


function preloader () {
	document.querySelector ("div.preloader").style.display = "none" ;
	document.querySelector ("div.body").style.display = "block" ;
}


function loader () {
	mnIcon = document.querySelector ("img.mnIcon") ;
	mnTitle = document.querySelector ("span.mnTitle") ;
	
	document.querySelector ("div.loader").style.display = "flex" ;
	mnIcon.style.display = "block" ;
	mnTitle.style.display = "block" ;
	
	setTimeout (function () {
		document.querySelector ("div.loader").style.display = "none" ;
	}, 300) ;
	
	setTimeout (function () {
		mnIcon.style.display = "none" ;
		mnTitle.style.display = "none" ;
	}, 360) ;
	
//	mnIcon = document.querySelector ("img.mnIcon") ;
//	mnTitle = document.querySelector ("span.mnTitle") ;
	
//	mnIcon.setAttribute ("src", `${b}`) ;
//	mnTitle.textContent = `${a}` ;
}



/*--------------------------------------------------
MODE TOGGLE
--------------------------------------------------*/



function sessionMode () {
	preMode = sessionStorage.getItem ("preMode") ;
	
	if (preMode === null) {
	} else {
		if (preMode === "light") {
			toLightMode () ;
		} else {
			toDarkMode () ;
		}
	}	
}


function modeToggle (a) {
	aClass = a.getAttribute ("class") ;
	
	if (aClass === "sun") {
		toLightMode () ;
		sessionStorage.setItem("preMode", "light") ;
	} else {
		toDarkMode () ;
		sessionStorage.setItem("preMode", "dark") ;
	}
}


function toLightMode () {
	img1 = document.querySelector ("div.toggleBox img:nth-of-type(1)") ;
	img2 = document.querySelector ("div.toggleBox img:nth-of-type(2)") ;
	toggleBtn = document.querySelector ("div.toggleBox span span") ;
	body = document.querySelector ("body") ;
		
	img1.setAttribute ("src", `images/icon-sun-dark.svg`) ;
	img2.setAttribute ("src", `images/icon-moon-dark.svg`) ;
	toggleBtn.style.marginLeft = "0.2rem" ;
	
	document.documentElement.style.setProperty ("--background", "#f4f6fa") ;
	document.documentElement.style.setProperty ("--secondary","#313e51") ;
	document.documentElement.style.setProperty ("--button", "#fff") ;		document.documentElement.style.setProperty ("--ascent", "#626c7f") ;
	document.documentElement.style.setProperty ("--ascent3", "#edf1f9") ;
	
	if (mediaQuery.matches) {
		body.style.background = "url('images/pattern-background-mobile-light.svg'), var(--background)" ;
	} else {
		body.style.background = "url('images/pattern-background-desktop-light.svg'), var(--background)" ;
	}
}


function toDarkMode () {
	img1 = document.querySelector ("div.toggleBox img:nth-of-type(1)") ;
	img2 = document.querySelector ("div.toggleBox img:nth-of-type(2)") ;
	toggleBtn = document.querySelector ("div.toggleBox span span") ;
	body = document.querySelector ("body") ;
	
	img1.setAttribute ("src", `images/icon-sun-light.svg`) ;
	img2.setAttribute ("src", `images/icon-moon-light.svg`) ;
	toggleBtn.style.marginLeft = "1.4rem" ;
	
	document.documentElement.style.setProperty ("--background", "#313e51") ;
	document.documentElement.style.setProperty ("--secondary","#ffff") ;
	document.documentElement.style.setProperty ("--button", "#3b4d66") ;
	document.documentElement.style.setProperty ("--ascent", "#abc1e1") ;
	document.documentElement.style.setProperty ("--ascent3", "#2d3949") ;
	
	if (mediaQuery.matches) {
		body.style.background = "url('images/pattern-background-mobile-dark.svg'), var(--background)" ;
	} else {
		body.style.background = "url('images/pattern-background-desktop-dark.svg'), var(--background)" ;
	}
}



/*--------------------------------------------------
QUESTION PAGE
--------------------------------------------------*/

qstNo = 0 ;
quiz = "" ;

function pickSubject (a) {
	document.querySelector ("section.page1").style.display = "none" ;
	loader () ;
	
	setTimeout (function () {
		quiz = a.getAttribute ("class") ;
		qstNo = 1 ;
		
		loadData (quiz, (qstNo - 1)) ;
	}, 300) ;
}


pickedAns = "" ;

function pickAns (a) {
	pickedAns = a.getAttribute ("for") ;
	
	errorNote = document.querySelector ("div.options button + span") ;
	errorNote.style.opacity = "0" ;
	
	document.querySelector ("a.toBottom").click () ;
}


score = 0 ;


function submitAns (a) {
	errorNote = document.querySelector ("div.options button + span") ;
	
	if (pickedAns.length === 0) {
		errorNote.style.opacity = "1" ;
		document.querySelector ("a.toBottom").click () ;
	} else {
		errorNote.style.opacity = "0" ;
		
		pickedAnsTxt = document.querySelector (`label[for="${pickedAns}"] span:nth-of-type(2)`).textContent ;
		iconCorrect = document.querySelector (`label[for="${pickedAns}"] span:nth-of-type(3) img:nth-of-type(1)`) ;
		iconIncorrect = document.querySelector (`label[for="${pickedAns}"] span:nth-of-type(3) img:nth-of-type(2)`) ;
		pickedLabel = document.querySelector (`label[for="${pickedAns}"]`) ;
		pickedBullet = document.querySelector (`label[for="${pickedAns}"] span:nth-of-type(1)`) ;
		
		if (pickedAnsTxt === correctAns) {
			score = (score * 1) + 1 ;
			iconCorrect.style.opacity = "1" ;
			iconIncorrect.style.opacity = "0" ;
			pickedLabel.style.borderColor = "var(--green)" ;
			pickedBullet.style.background = "var(--green)" ;
		} else {
			score = score ;
			iconCorrect.style.opacity = "0" ;
			iconIncorrect.style.opacity = "1" ;
			pickedLabel.style.borderColor = "var(--red)" ;
			pickedBullet.style.background = "var(--red)" ;
			
			if (document.querySelector (`label[for="a"] span:nth-of-type(2)`).textContent === correctAns ) {
				correctOption = "a" ;
			} else {
				if (document.querySelector (`label[for="b"] span:nth-of-type(2)`).textContent === correctAns ) {
					correctOption = "b" ;
				} else {
					if (document.querySelector (`label[for="c"] span:nth-of-type(2)`).textContent === correctAns ) {
						correctOption = "c" ;
					} else {
						if (document.querySelector (`label[for="d"] span:nth-of-type(2)`).textContent === correctAns ) {
							correctOption = "d" ;
						}
					}
				}
			}
			
			correctLabel = document.querySelector (`label[for="${correctOption}"]`) ;
			correctLabel.style.animationName = "correctGrn" ;
			
		}
		
		document.querySelector (`label[for="a"]`).removeAttribute ("for") ;
		document.querySelector (`label[for="b"]`).removeAttribute ("for") ;
		document.querySelector (`label[for="c"]`).removeAttribute ("for") ;
		document.querySelector (`label[for="d"]`).removeAttribute ("for") ;
		
		document.querySelector ("label.btn:nth-of-type(1)").setAttribute ("id", "btnD")
		document.querySelector ("label.btn:nth-of-type(2)").setAttribute ("id", "btnD")
		document.querySelector ("label.btn:nth-of-type(3)").setAttribute ("id", "btnD")
		document.querySelector ("label.btn:nth-of-type(4)").setAttribute ("id", "btnD")
		
		if (qstNo === 10) {
			a.textContent = "Result" ;
			a.setAttribute ("onclick", "seeResult()") ;
		} else {
			a.textContent = "Next Question" ;
			a.setAttribute ("onclick", "toNextQuestion(this)") ;
		}
		
		pickedAns = "" ;
	}
	
}


function toNextQuestion (a) {
	document.querySelector ("section.page2").remove () ;
	loader () ;
	
	setTimeout (function () {
		qstNo = (qstNo * 1) + 1 ;
		loadData (quiz, (qstNo - 1)) ;
	}, 300) ;
}


correctAns = ""
iconImg = ""
titleTxt = ""

function loadQuestionPage (a, b, c, d, e, f, g, h) {
	//h answer
	correctAns = h ;
	iconImg = b ;
	titleTxt = a ;
	
	mnIcon = document.querySelector ("img.mnIcon") ;
	mnTitle = document.querySelector ("span.mnTitle") ;
	
	mnIcon.setAttribute ("src", `${b}`) ;
	mnTitle.textContent = `${a}` ;
	
	
	section = document.createElement ("section") ;
	section.setAttribute ("class", "page2") ;
	document.querySelector ("div.body").appendChild (section) ;
	
		divSubjectSh = document.createElement ("div") ;
		divSubjectSh.setAttribute ("class", "subjectSh") ;
		section.appendChild (divSubjectSh) ;
		
			subjectShImg = document.createElement ("img") ;
			subjectShImg.setAttribute ("src", `${b}`) ;
			divSubjectSh.appendChild (subjectShImg) ;
			
			subjectShSpan = document.createElement ("span") ;
			subjectShSpan.textContent = `${a}` ;
			divSubjectSh.appendChild (subjectShSpan) ;
			
		divQuestion = document.createElement ("div") ;
		divQuestion.setAttribute ("class", "question") ;
		section.appendChild (divQuestion) ;
		
			pQuestionNo = document.createElement ("p") ;
			pQuestionNo.textContent = (`Question ${qstNo} of 10`) ;
			divQuestion.appendChild (pQuestionNo) ;
			
			pQuestion = document.createElement ("p") ;
			pQuestion.textContent = (`${c}`) ;
			divQuestion.appendChild (pQuestion) ;
			
			spanProgress = document.createElement ("span") ;
			spanProgress.setAttribute ("class", "progress") ;
			divQuestion.appendChild (spanProgress) ;
			
				spanProgressP = document.createElement ("span") ;
				spanProgressP.style.width = `${qstNo}0%` ;
				spanProgress.appendChild (spanProgressP) ;
				
		divOptions = document.createElement ("div") ;
		divOptions.setAttribute ("class", "options") ;
		section.appendChild (divOptions) ;
		
			radioA = document.createElement ("input") ;
			radioA.setAttribute ("type", "radio") ;
			radioA.setAttribute ("id", "a") ;
			radioA.setAttribute ("name", "options") ;
			divOptions.appendChild (radioA) ;
			
			labelA = document.createElement ("label") ;
			labelA.setAttribute ("for", "a") ;
			labelA.setAttribute ("class", "btn") ;
			labelA.setAttribute ("onclick", "pickAns (this)") ;
			divOptions.appendChild (labelA) ;
			
				bulletA = document.createElement ("span") ;
				bulletA.setAttribute ("class", "optionBullet") ;
				bulletA.textContent = ("A") ;
				labelA.appendChild (bulletA) ;
				
				mnOptionA = document.createElement ("span") ;
				mnOptionA.textContent = (`${d}`) ;
				labelA.appendChild (mnOptionA) ;
				
				spanCheckA = document.createElement ("span") ;
				labelA.appendChild (spanCheckA) ;
				
					checkA1 = document.createElement ("img") ;
					checkA1.setAttribute ("src", "images/icon-correct.svg") ;
					spanCheckA.appendChild (checkA1) ;
					
					checkA2 = document.createElement ("img") ;
					checkA2.setAttribute ("src", "images/icon-incorrect.svg") ;
					spanCheckA.appendChild (checkA2) ;
					
			radioB = document.createElement ("input") ;
			radioB.setAttribute ("type", "radio") ;
			radioB.setAttribute ("id", "b") ;
			radioB.setAttribute ("name", "options") ;
			divOptions.appendChild (radioB) ;
			
			labelB = document.createElement ("label") ;
			labelB.setAttribute ("for", "b") ;
			labelB.setAttribute ("class", "btn") ;
			labelB.setAttribute ("onclick", "pickAns (this)") ;
			divOptions.appendChild (labelB) ;
			
				bulletB = document.createElement ("span") ;
				bulletB.setAttribute ("class", "optionBullet") ;
				bulletB.textContent = ("B") ;
				labelB.appendChild (bulletB) ;
				
				mnOptionB = document.createElement ("span") ;
				mnOptionB.textContent = (`${e}`) ;
				labelB.appendChild (mnOptionB) ;
				
				spanCheckB = document.createElement ("span") ;
				labelB.appendChild (spanCheckB) ;
				
					checkB1 = document.createElement ("img") ;
					checkB1.setAttribute ("src", "images/icon-correct.svg") ;
					spanCheckB.appendChild (checkB1) ;
					
					checkB2 = document.createElement ("img") ;
					checkB2.setAttribute ("src", "images/icon-incorrect.svg") ;
					spanCheckB.appendChild (checkB2) ;
					
			radioC = document.createElement ("input") ;
			radioC.setAttribute ("type", "radio") ;
			radioC.setAttribute ("id", "c") ;
			radioC.setAttribute ("name", "options") ;
			divOptions.appendChild (radioC) ;
			
			labelC = document.createElement ("label") ;
			labelC.setAttribute ("for", "c") ;
			labelC.setAttribute ("class", "btn") ;
			labelC.setAttribute ("onclick", "pickAns (this)") ;
			divOptions.appendChild (labelC) ;
			
				bulletC = document.createElement ("span") ;
				bulletC.setAttribute ("class", "optionBullet") ;
				bulletC.textContent = ("C") ;
				labelC.appendChild (bulletC) ;
				
				mnOptionC = document.createElement ("span") ;
				mnOptionC.textContent = (`${f}`) ;
				labelC.appendChild (mnOptionC) ;
				
				spanCheckC = document.createElement ("span") ;
				labelC.appendChild (spanCheckC) ;
				
					checkC1 = document.createElement ("img") ;
					checkC1.setAttribute ("src", "images/icon-correct.svg") ;
					spanCheckC.appendChild (checkC1) ;
					
					checkC2 = document.createElement ("img") ;
					checkC2.setAttribute ("src", "images/icon-incorrect.svg") ;
					spanCheckC.appendChild (checkC2) ;
			
			radioD = document.createElement ("input") ;
			radioD.setAttribute ("type", "radio") ;
			radioD.setAttribute ("id", "d") ;
			radioD.setAttribute ("name", "options") ;
			divOptions.appendChild (radioD) ;
			
			labelD = document.createElement ("label") ;
			labelD.setAttribute ("for", "d") ;
			labelD.setAttribute ("class", "btn") ;
			labelD.setAttribute ("onclick", "pickAns (this)") ;
			divOptions.appendChild (labelD) ;
			
				bulletD = document.createElement ("span") ;
				bulletD.setAttribute ("class", "optionBullet") ;
				bulletD.textContent = ("D") ;
				labelD.appendChild (bulletD) ;
				
				mnOptionD = document.createElement ("span") ;
				mnOptionD.textContent = (`${g}`) ;
				labelD.appendChild (mnOptionD) ;
				
				spanCheckD = document.createElement ("span") ;
				labelD.appendChild (spanCheckD) ;
				
					checkD1 = document.createElement ("img") ;
					checkD1.setAttribute ("src", "images/icon-correct.svg") ;
					spanCheckD.appendChild (checkD1) ;
					
					checkD2 = document.createElement ("img") ;
					checkD2.setAttribute ("src", "images/icon-incorrect.svg") ;
					spanCheckD.appendChild (checkD2) ;
					
			btn = document.createElement ("button") ;
			btn.setAttribute ("onclick", "submitAns (this)") ;
			btn.textContent = ("Submit Answer") ;
			divOptions.appendChild (btn) ;
	
			spanError = document.createElement ("span") ;
			divOptions.appendChild (spanError) ;
			
				imgError = document.createElement ("img") ;
				imgError.setAttribute ("src", "images/icon-error.svg") ;
				spanError.appendChild (imgError) ;
				
				errorN = document.createElement ("span") ;
				errorN.textContent = ("Please select an answer") ;
				spanError.appendChild (errorN) ;
}



/*--------------------------------------------------
SEE RESULT
--------------------------------------------------*/



function seeResult () {
	page3 = document.querySelector ("section.page3") ;
	page2 = document.querySelector ("section.page2") ;
	img = document.querySelector ("section.page3 div.score div.title img") ;
	titleT = document.querySelector ("section.page3 div.score div.title span") ;
	subjectShImg = document.querySelector ("div.subjectSh3 img") ;
	subjectShT = document.querySelector ("div.subjectSh3 span") ;
	scoreT = document.querySelector ("section.page3 div.score p.score") ;
	
	loader () ;
	
	setTimeout (function () {
		page3.style.display = "block" ;
		if (!mediaQuery.matches) {
			page3.style.display = "flex" ;
		} else {}
	}, 300) ;
	
	page2.remove () ;
	img.setAttribute ("src", `${iconImg}`) ;
	titleT.textContent = titleTxt ;
	subjectShImg.setAttribute ("src", `${iconImg}`) ;
	subjectShT.textContent = titleTxt ;
	scoreT.textContent = `${score}` ;
}



function playAgain () {
	page1 = document.querySelector ("section.page1") ;
	page3 = document.querySelector ("section.page3") ;
	
	page3.style.display = "none" ;
	loader () ;
	
	setTimeout (function () {
		page1.style.display = "block" ;
		if (!mediaQuery.matches) {
			page1.style.display = "flex" ;
		} else {}
	}, 300) ;
	
	
	setTimeout (function () {
		mnIcon = document.querySelector ("img.mnIcon") ;
		mnTitle = document.querySelector ("span.mnTitle") ;
		
		mnIcon.setAttribute ("src", "") ;
		mnTitle.textContent = "" ;
		
		score = 0 ;
	}, 400) ;
}