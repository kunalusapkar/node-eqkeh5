const axios = require('axios')
const config = require('../config.json')

exports.getAllPlayers = async(req,res,next)=>{
    try{
    const data = await axios.get(`${config.apiUrl}/players?search=LeBron`)
    var playerDetails = data.data
    var maxCount = 0
    var minCount = 0
    var playerData

    for(let i = 2014;i <= 2020;i++){
        var playerStatData = await axios.get(`${config.apiUrl}/season_averages?season=${i}&player_ids[]=237`)
        var overAllStats = playerStatData.data.data[0]
        if(typeof overAllStats !== "undefined"){
            playerData = 1
            if(overAllStats.games_played > 50){
                maxCount+=1
            }
            if(overAllStats.games_played < 50){
                minCount+=1
            }
        }else {
            playerData = 0
        }
        
    }
    if(playerDetails.data.length > 0 && playerData){
        res.status(200).json({
            "Player Name":playerDetails.data[0].first_name +" "+playerDetails.data[0].last_name,
            "Games Played":{"Above50":maxCount,"Below50":minCount}
        })
    }else{
        res.status(200).json({
            data:"No data Found"
        })
    }
    
    }catch(error){
        console.log("er--->",error)
    }
    
}