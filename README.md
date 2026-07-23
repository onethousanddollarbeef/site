# Lani Cao Law Office website

Static recreation of [lanicao.com](https://www.lanicao.com) for migration off Wix.

- English site at `/`
- Chinese site at `/zh/`
- Lead forms submit to a backend endpoint (see `SETUP.md`)
- Brand name is stacked: **Lani Cao** above **Law Office**

## Run locally

```bash
python3 -m http.server 8080
```

Visit `http://localhost:8080` and `http://localhost:8080/zh/`.

## Next integrations

See [`SETUP.md`](./SETUP.md) for Formspree/Getform lead storage and Sanity/Ghost blog CMS recommendations.
