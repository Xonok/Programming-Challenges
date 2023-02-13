const dayStart = "07:30";
const dayEnd = "17:45";

function minutes(timeString){
	if(typeof timeString !== "string"){throw new Error("Invalid timeString")}
	var tokens = timeString.split(":").map(Number)
	return tokens[0]*60+tokens[1]
}
function scheduleMeeting(startTime,durationMinutes){
	if(typeof startTime !== "string"){return false}
	if(typeof durationMinutes !== "number"){return false}
	var day_start_minutes = minutes(dayStart)
	var day_end_minutes = minutes(dayEnd)
	var start_minutes = minutes(startTime)
	var end_minutes = start_minutes+durationMinutes
	//console.log(start_minutes,day_start_minutes,end_minutes,day_end_minutes)
	if(start_minutes < day_start_minutes){return false}
	if(end_minutes > day_end_minutes){return false}
	return true
}
function addElement(parent,type,inner){
	var div = document.createElement(type)
	if(inner!==undefined){div.innerHTML = inner}
	parent.append(div)
	return div
}

function test(){
	const do_test = (start,duration,expected=true)=>{
		var txt = start+","+duration
		var result = scheduleMeeting(start,duration)
		txt += result ? " : meeting" : " : no meeting"
		txt += result === expected ? "(correct)" : "(wrong)"
		var div = addElement(document.body,"div",txt)
		div.style.color = result === expected ? "green" : "red"
	}
	do_test("7:00",15,false) //false
	do_test("07:15",30,false) //false
	do_test("7:30",30) //true
	do_test("11:30",60) //true
	do_test("17:00",45) //true
	do_test("17:30",30,false) //false
	do_test("18:00",15,false) //false
}

window.nojs.remove()
test()