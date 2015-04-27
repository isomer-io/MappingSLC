var apiCall = {

    decimalCensus: {
        summary: 'http://api.census.gov/data/2010/sf1',
        tags: 'http://api.census.gov/data/2010/sf1/tags.json',
        variables: 'http://api.census.gov/data/2010/sf1/variables.json',
        year: {}
    },
    acs: {
        mainCall: 'http://api.census.gov/data/',
        year: {
            five: 'acs5?',
            three: 'acs3?',
            one:  'acs1?'
        }
    },
    variables: {
        main: 'variables.json',
        for: '/profile/variables/for.json',
        in: '/profile/variables/in.json'
    }

};