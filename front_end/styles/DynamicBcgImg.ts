import styled from "styled-components";

interface Props {
  image_id: string | undefined,
  height: number | undefined
}

export const BackgroundImage = styled.div<Props>`
  z-index: -1;

  animation: fade-in forwards 300ms;

  position: absolute;
  top: 0;
  left: 0;

  height: ${(props) => props.height! > 700 ? '90vh' : '100vh'};
  width: 100%;

  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
    ${(props) =>
    `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`};

  background-repeat: no-repeat;
  background-size: auto 75%;
  background-position: top;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (min-width: 425px) {
    height: ${(props) => props.height! > 700 ? '90vh' : '100vh'};
    background-size: cover;
    background-position: top;
  }

  @media (min-width: 1020px) {
    background-size: cover;
  }

  @media (min-width: 1440px) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
      ${(props) =>
    `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`};
  }
`;

export const PlatformBackgroundImage = styled.div<Props>`
  z-index: -1;

  animation: fade-in forwards 300ms;

  position: absolute;
  top: 0;
  left: 0;

  height: ${(props) => props.height! > 700 ? '90vh' : '100vh'};
  width: 100%;

  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    ${(props) =>
    `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`};


  background-repeat: no-repeat;
  background-size: auto 75%;
  background-position: top;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (min-width: 425px) {
    height: ${(props) => props.height! > 700 ? '90vh' : '100vh'};
    background-size: cover;
    background-position: top;
  }

  @media (min-width: 1020px) {
    background-size: cover;
  }

`;

export const ReleasesContainerBcgImg = styled.div<Props>`

  z-index: 1;
  background-color: transparent;

  ::before{
    overflow: hidden;

    position: absolute;

    content: '';
    z-index: -1;
    width: 100% !important;
    height: 100% !important;
    max-height: 100vh;

    @media(min-width: 720px){
      max-height: 80vh;
    }

    height: ${(props) => props.height! > 700 ? '90vh' : '100vh'};
    width: 100%;

    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(20, 23, 30, 1)),
      ${(props) =>
    `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`};

    background-repeat: no-repeat;
    background-size: auto 75%;
    background-position: top;

    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @media (min-width: 425px) {
      height: ${(props) => props.height! > 700 ? '90vh' : '100vh'};
      background-size: cover;
      background-position: top;
    }

    @media (min-width: 1020px) {
      background-size: cover;
    }

    @media (min-width: 1440px) {
      background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(20, 23, 30, 1)),
        ${(props) =>
    `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`};
    }

  }

`