import { graphql } from "gatsby";

export const query = graphql`
  fragment ExternalLink on STRAPI__COMPONENT_SHARED_LINKS {
    id
    link
    label
  }
  fragment ImageBase on STRAPI__MEDIA {
    id
    alternativeText
    caption
  }
  fragment AreaBase on STRAPI_AREA {
    id
    slug
    name
    description
    color
  }
  fragment AreaDetail on STRAPI_AREA {
    ...AreaBase
    projects {
      id
      # images {
      #   ...ImageBase
      #   localFile {
      #     childImageSharp {
      #       gatsbyImageData(height: 25, placeholder: BLURRED)
      #     }
      #   }
      # }
    }
    tags {
      id
      name
    }
  }
  fragment Organization on STRAPI_ORGANIZATION {
    id
    name
    link
  }
  fragment ProjectBase on STRAPI_PROJECT {
    id
    title
    name
    slug
    description {
      data {
        description
      }
      # medias {
      #   alternativeText
      #   childImageSharp {
      #     gatsbyImageData(width: 600, placeholder: BLURRED)
      #   }
      # }
    }
    coverImage {
      ...ImageBase
      localFile {
        childImageSharp {
          gatsbyImageData(width: 800)
        }
      }
    }
    tags {
      id
      name
    }
    areas {
      ...AreaBase
    }
    links {
      ...ExternalLink
    }
  }
  fragment ProjectDetail on STRAPI_PROJECT {
    id
    title
    name
    slug
    description {
      data {
        description
      }
      # medias {
      #   alternativeText
      #   childImageSharp {
      #     gatsbyImageData(width: 600, placeholder: BLURRED)
      #   }
      # }
    }
    organization {
      ...Organization
    }
    coverImage {
      ...ImageBase
      localFile {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
        }
      }
    }
    images {
      ...ImageBase
      localFile {
        childImageSharp {
          gatsbyImageData(width: 800, placeholder: DOMINANT_COLOR)
        }
      }
    }
    tags {
      id
      name
    }
    areas {
      ...AreaBase
    }
    links {
      ...ExternalLink
    }
  }
  fragment Profile on STRAPI__COMPONENT_SHARED_PROFILE {
    picture {
      ...ImageBase
      localFile {
        childImageSharp {
          gatsbyImageData(height: 200, placeholder: DOMINANT_COLOR)
        }
      }
    }
    qualities {
      text
    }
  }
  fragment Contact on STRAPI__COMPONENT_SHARED_CONTACT {
    text
    button {
      ...ExternalLink
    }
  }
`;
