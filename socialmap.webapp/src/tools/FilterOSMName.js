export default function filterOSMName(string) {
    let poiName = string.display_name.split(',')
    let res = []
    if (string.address.hasOwnProperty('city'))
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.country.replace(/\s/g, ''))
    if (string.address.hasOwnProperty('state'))
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.state.replace(/\s/g, ''))
    if (string.address.hasOwnProperty('postcode'))
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.postcode)
    if (string.address.hasOwnProperty('city_district'))
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.city_district.replace(/\s/g, ''))
    if (string.address.hasOwnProperty('quarter'))
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.quarter.replace(/\s/g, ''))
    if (string.address.hasOwnProperty('suburb')) {
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.suburb.replace(/\s/g, ''))
        res.push(string.address.suburb)
    }
    if (string.address.hasOwnProperty('neighbourhood'))
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.neighbourhood.replace(/\s/g, ''))
    if (string.address.hasOwnProperty('road')) {
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.road.replace(/\s/g, ''))
        res.splice(0, 0, string.address.road)
    }
    if (string.address.hasOwnProperty('house_number')) {
        poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.house_number.replace(/\s/g, ''))
        res.splice(1, 0, string.address.house_number)
    }
    res.splice(0, 0, poiName.join(''))
    return res
}