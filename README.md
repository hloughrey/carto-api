<p align="center">
    <img alt="Latitude55" src="https://res.cloudinary.com/latitude55/image/upload/v1634117961/logo-light.svg" width="210" />
</p>
<h1 align="center">
Carto API
</h1>

# Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Summary](#summary)
- [Getting started](#getting-started)
  - [Development](#development)
  - [Endpoints](#endpoints)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

Create an API which returns GeoJson from a Google BigQuery table.

## Getting started

Requirements:

- Node: v18.x

> Info: If you have Volta installed, then it will manage this dependency for you.

### Development

```bash
npm i
cp .env.template .env
npm run start
```

### Endpoints

GET http://localhost:3000/api/table/:tableFQN?geoColumn=geom
GET http://localhost:3000/api/tiles/:tableFQN/:z/:x/:y
