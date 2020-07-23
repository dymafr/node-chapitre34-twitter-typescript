window.addEventListener('DOMContentLoaded', () => {
  bindTweet();
})

function bindTweet() {
  const elements = document.querySelectorAll('.fa-minus-circle');
  const tweetContainer = document.querySelector('#tweet-list-container');

  elements.forEach( e => {
    e.addEventListener('click', ($event) => {
      const tweetId = $event.target.getAttribute('tweetid');
      axios.delete('/tweets/' + tweetId)
           .then( function(response) {
             tweetContainer.innerHTML = response.data;
             bindTweet();
           })
           .catch( function(err) { console.log(err) } );
    })
  })
}