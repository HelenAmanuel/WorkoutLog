var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      const reps = this.parentNode.parentNode.childNodes[1].innerText
      const sets = this.parentNode.parentNode.childNodes[3].innerText
      const workout = this.parentNode.parentNode.childNodes[5].innerText
      const comment = this.parentNode.parentNode.childNodes[7].innerText
      console.log(comment)
      fetch('workout', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'reps': reps,
          'sets': sets,
          'workout': workout,
          'comment': comment
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

document.querySelector('#maniBtn').addEventListener('click', function(){
      const one = document.querySelector("#one").value
      const two = document.querySelector("#two").value
      const three = document.querySelector("#three").value
      console.log(one)
      fetch('mantraUpdate', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'one': one,
          'two': two,
          'three': three
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
