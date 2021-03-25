/**
 * This method is used to calculate the average tweet length by dividing the 
 * sum of all tweet lenghts by the number of all tweets.
 * 
 * @param {*} sumOfTweetLengths 
 * @param {*} numberOfTweets 
 * @returns Rounded average tweet length value.
 */
function calculateAverageTweetLength(sumOfTweetLengths, numberOfTweets) {
    // Divide the sum of all tweet lenghts by the number of all tweets and round the result.
    return (sumOfTweetLengths/numberOfTweets).toFixed(2);
}

//----------------------------------------------------------------------------------------------------------------------------------

var statisticalDataEndpoint = "/statistic";

// Get data for top hashtag, number of tweets in database and average tweet length.
$.ajax({
    url: baseURL + statisticalDataEndpoint,
    method: 'GET',
    dataType: 'json',
    success: function (responseData) {
        // Variables for top hashtag and number of all tweets in database.
        var topHashtag = responseData.result.topHashTag;
        var allTweets = responseData.result.tweets;

        // Attention the 'tweetLength' key from json of response data represent the sum of all tweet lengths over all tweets.
        var sumOfAllTweetLengths = responseData.result.tweetLength;
        // Calculate average tweet length.
        var averageTweetLength = calculateAverageTweetLength(sumOfAllTweetLengths, allTweets);

        // Reference to html ids to represent data in Cards.
        $("#topHashtag").html(topHashtag);
        $("#numberOfTweetsInDatabase").html(allTweets);
        $("#averageTweetLength").html(averageTweetLength);
    },
    failure: function () {
        alert("Fetching for statistical data failed. Connection error");
    }
});

//----------------------------------------------------------------------------------------------------------------------------------

var userDataEndpoint = "users?retweet=false";

// Get data for user with most tweets.
$.ajax({
    url: baseURL + userDataEndpoint,
    method: 'GET',
    dataType: 'json',
    success: function (responseData) {
        // Variable for user with most tweets and the number of twittered tweets.
        var userWithMostTweets = responseData.result[0].user;
        var numberOfTweetsFromUser = responseData.result[0].tweets;

        // Reference to html id to represent data in Cards.
        $("#userWithMostTweets").html(userWithMostTweets + " " + "(" + numberOfTweetsFromUser + ")");
       
    },
    failure: function () {
        alert("Fetching for statistical data failed. Connection error");
    }
});







