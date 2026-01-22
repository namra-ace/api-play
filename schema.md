# Database Schema

## Collection: profile

Stores a single document representing the candidate’s personal profile.

---

## Fields

- **name**: String (required)
- **email**: String (required)
- **education**: String
- **skills**: [String] (indexed)
- **projects**:
  - title: String (required)
  - description: String
  - links: [String]
- **work**: String
- **links**:
  - github: String
  - linkedin: String
  - portfolio: String (optional)
- **createdAt**: Date (auto-generated)
- **updatedAt**: Date (auto-generated)

---

## Indexes

- **Text index** on:
  - name
  - skills
  - projects.title  
  *(Used to support keyword-based search queries)*

- **Standard index** on:
  - skills  
  *(Used for skill-based filtering)*

---

## Design Notes

- A **single profile document** is stored by design, as the application represents one candidate profile.
- Projects are **embedded** within the profile document to simplify reads and avoid unnecessary joins.
- Schema is optimized for **read-heavy operations** such as profile viewing and project search.

---

## Limitations

- No normalization for projects (intentional, due to single-user scope)
- No pagination required given the small dataset
