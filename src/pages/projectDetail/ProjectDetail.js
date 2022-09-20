// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useParams } from 'react-router-dom';

// ==============================|| PROJECT DETAIL PAGE ||============================== //

const ProjectDetail = (props) => {
    const { ProjectId } = useParams();
    console.log(props);
    return (
        <>
            {ProjectId}
            <MainCard title="Project Detail">
                <Typography variant="body2">
                    Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa.
                    Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube
                    grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non
                    president, sunk in culpa qui officiate descent molls anim id est labours.
                </Typography>
            </MainCard>
        </>
    );
};

export default ProjectDetail;
