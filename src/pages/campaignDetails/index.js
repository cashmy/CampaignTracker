export async function getStaticProps(context) {
  const params = context
  console.log('params', params)
  return {
    props: {
      record: 1,
    },
  };
}


const CampaignDetails = (props) => {
  return <div> Campaign Details {props.record} </div>;
};


export default CampaignDetails;
