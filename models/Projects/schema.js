module.exports = {
  id: {type: String, default: ''}, // this is the slug - civic.sf.json + civic.dc.json
  brigade: {type: String, default: ''}, // this is the brigade the project currently belongs to - civic.sf.json

  /* Standard BetaNYC civic.json, used by CFAPI */

  active: { type: Boolean, default: false },
  status: {type: String, default: ''}, // civic.json + civic.dc.json - proposed, ideation, alpha, beta, production, archival
  thumbnailUrl: {type: String, default: 'http://i.imgur.com/2lHqtJ7.png'},
  bannerUrl: {type: String, default: 'http://i.imgur.com/2lHqtJ7.png'},
  bornAt: {type: String, default: ''},
  geography: {type: String, default: ''},
  politicalEntity: {type: String, default: ''},
  type: {type: String, default: ''},
  needs: {type: Array, default: []},
  categories: {type: Array, default: []},

  /* Expanded Open DC civic.json */

  // id: {type:String, default:''}, // represented above
  name: {type: String, default: ''}, // Display title
  description: {type: String, default: ''},
  content: {type: String, default: ''},
  license: {type: String, default: ''},
  // status: {type:String, default:''}, // represented above
  homepage: {type: String, default: ''},
  repository: {type: String, default: ''},
  githubSlug: {type: String, default: ''},
  contact: {type: Array, default: []},
  partners: {type: Array, default: []}, // name, email, logo?
  data: {type: Array, default: []},
  keywords: {type: Array, default: []}, // simple strings
  links: {type: Array, default: []}, // simple strings
  videos: {type: Array, default: []},
  published: {type: Boolean, default: true}
}
