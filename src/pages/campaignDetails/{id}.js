export async function getStaticProps(context) {
  const params = context
  console.log('params', params)
  return {
    props: {
      record: 1,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: 1,
    fallback: true,
  }
}

const CampaignDetails = (props) => {
  return <div> Campaign Details {props.record} </div>;
};


export default CampaignDetails;