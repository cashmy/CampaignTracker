import React from "react";
import { Grid } from "@mui/material";
import AppGridContainer from "@/../../lib/components/AppGridContainer";
// import AppAnimate from '@/../../lib/components/AppAnimate';
// import { useGetDataApi } from '@/../../lib/hooks/APIHooks';
// import modules for dashboard here ...
// import AppLoader from "@/../../lib/components/AppLoader";

const Default = () => {
  // const [{ apiData: defaultData, loading }] = useGetDataApi('/dashboard/default');
  return (
    <>
      {/* {loading ? (
        <AppLoader />
      ) : ( */}
        <AppGridContainer>
          <Grid item xs={12}>
            <div>Hi Cash</div>
          </Grid>
        </AppGridContainer>
      {/* )} */}
    </>
  );
};

export default Default;
