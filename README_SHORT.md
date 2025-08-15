# Backend Recruitment Task - Quick Guide

## How do you determine whether something is a city?

### Current Approach:
The service uses a multi-step validation process:
1. **Basic Requirements** - valid name, pollution data, country code
2. **Name Normalization** - trim whitespace, normalize accents, capitalize words
3. **Content Filtering** - reject keywords like "station", "plant", "district"
4. **Duplicate Prevention** - case-insensitive comparison with diacritics removed

### Suggested Improvement: City Validation via Centralized Database or External API
Instead of keyword-based filtering, implement:
- **Persistent city database** (MongoDB/PostgreSQL) storing valid cities
- **External API integration** (GeoNames/OpenStreetMap) for authoritative data
- **Multilingual support** for region-specific validation
- **Resilient to server restarts** with persisted data
- **Reduced false positives/negatives** with authoritative sources

## Limitations and Assumptions

### Current Limitations:
- Keyword filtering may reject valid cities
- Length restrictions exclude legitimate long names
- No external validation - relies on name patterns only
- English-centric validation rules
- Memory-based duplicate detection (resets on restart)

### Technical Constraints:
- Exact string matching only (no fuzzy matching)
- Single language support
- Synchronous validation
- Static, hardcoded rules

### Assumptions:
- Pollution data source provides reliable country codes
- Wikipedia API has descriptions for valid cities
- Rate limiting (100 req/15min) is sufficient
- Cache TTL (1 hour) balances freshness vs performance
- Mock API follows expected format despite potential corruption
