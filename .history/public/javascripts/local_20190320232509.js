function get(key){
	return JSON.parse(localStorage.getItem(key)) || []
}