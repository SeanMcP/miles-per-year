function createTag(milesPerYear) {
    var average = 13500
    var tag = document.createElement('span')
    var color = '#F44336'
    var className = 'CX-miles-per-year__high'
    if (milesPerYear > 0 && milesPerYear < average - 2000) {
        color = '#4CAF50'
        className = 'CX-miles-per-year__low'
    } else if (
        milesPerYear >= average - 2000 &&
        milesPerYear <= average + 2000
    ) {
        color = '#FF9800'
        className = 'CX-miles-per-year__average'
    }
    tag.classList.add('CX-miles-per-year', className)
    tag.style.backgroundColor = color
    tag.style.color = 'white'
    tag.style.padding = '2px 4px'
    tag.style.marginLeft = '0.25rem'

    tag.textContent = `${milesPerYear.toLocaleString()} miles/year`

    return tag
}

function removeOldTags() {
    Array.from(document.querySelectorAll('span.CX-miles-per-year')).forEach(
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

            // In case miles not listed
            if (milesSpan) {
                var milesText = milesSpan.textContent
                var miles = milesText.match(/\d+/g).join('')
                var milesPerYear = Math.floor(parseInt(miles) / age)
                milesSpan.appendChild(createTag(milesPerYear))
            }
        }
    )
}

function cars() {
    Array.from(document.querySelectorAll('.listing-row__details')).forEach(
        function(card) {
            // AGE
            var currentModelYear = new Date().getYear() + 1901
            // getYear is relative to 1900
            var title = card.querySelector('.listing-row__title').textContent
            var numbers = title.match(/(\d+){4}/g)
            var modelYear = numbers[0]
            var age = currentModelYear - parseInt(modelYear)

            // MILES
            var milesElement = card.querySelector('.listing-row__mileage')

            // In case miles not listed
            if (milesElement) {
                var milesText = milesElement.textContent
                var miles = milesText.match(/\d+/g).join('')
                var milesPerYear = Math.floor(parseInt(miles) / age)
                milesElement.appendChild(createTag(milesPerYear))
            }
        }
    )
}

var hostMap = {
    'www.autotrader.com': autotrader,
    'www.cars.com': cars
}

var host = location.host

if (hostMap.hasOwnProperty(host)) {
    console.log(
        `Adding miles per year tag on: ${host.slice(host.indexOf('.') + 1)}`
    )
    removeOldTags()
    hostMap[host]()
}
