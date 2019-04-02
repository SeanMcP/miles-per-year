function createTag(milesPerYear) {
    var tag = document.createElement('span')
    tag.classList.add('miles-per-year')
    var color = 'red'
    if (milesPerYear > 0 && milesPerYear < 10000) {
        color = 'green'
    } else if (milesPerYear >= 10000 && milesPerYear <= 14000) {
        color = 'orange'
    }
    tag.style.backgroundColor = color
    tag.style.color = 'white'
    tag.style.padding = '2px 4px'
    tag.style.marginLeft = '8px'

    tag.textContent = `${milesPerYear.toLocaleString()} miles/year`

    return tag
}

function removeOldTags() {
    Array.from(document.querySelectorAll('span.miles-per-year')).forEach(
        function(element) {
            element.parentNode.removeChild(element)
        }
    )
}

function autotrader() {
    Array.from(document.querySelectorAll('div.inventory-listing-body')).forEach(
        function(card) {
            // AGE
            var currentModelYear = new Date().getYear() + 1901
            // getYear is relative to 1900
            var title = card.querySelector('h2.text-size-400').textContent
            var numbers = title.match(/(\d+){4}/g)
            var modelYear = numbers[0]
            var age = currentModelYear - parseInt(modelYear)

            // MILES
            var allSpans = Array.from(card.querySelectorAll('span.text-bold'))
            var milesSpan = allSpans.filter(element => {
                return element.textContent.toLowerCase().includes('miles')
            })[0]

            // Not every listing has miles
            if (milesSpan) {
                var milesText = milesSpan.textContent
                var miles = milesText.match(/\d+/g).join('')
                var milesPerYear = Math.floor(parseInt(miles) / age)
                milesSpan.appendChild(createTag(milesPerYear))
            }
        }
    )
}

var hostMap = {
    'www.autotrader.com': autotrader
}

if (hostMap.hasOwnProperty(location.host)) {
    console.log(`Adding miles per year tag on: ${location.host}`)
    removeOldTags()
    hostMap[location.host]()
}
