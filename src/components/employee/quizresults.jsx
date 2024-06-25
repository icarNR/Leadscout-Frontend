import React from 'react';
import CustomizedProgressBars from '../common/ProgressBar';
import BasicTabs from '../common/tab';
function Results({Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism}){
  // Define data for the progress bars
  const progressBarsData = [
    { name: 'Openness', percentage: Openness, color:'#FFF500' },
    { name: 'Conscientiousness', percentage: Conscientiousness, color:'#AB40FF' },
    { name: 'Extraversion', percentage: Extraversion , color:'#FF00B8'},
    { name: 'Agreeableness', percentage: Agreeableness , color:'#52FF00'},
    { name: 'Neuroticism', percentage: Neuroticism , color:'#00D1FF'},
  ];
  const isSmallScreen = window.innerWidth < 640; // Example breakpoint: 640px

  return (
    <div className='flex flex-col w-full  '>
      {progressBarsData.map((item, index) => (
        <div key={index} className='flex flex-col sm:flex-row p-1 '>
          <div className='min-w-[130px] text-sm flex-shrink-1 text-center sm:text-left'>{item.name}</div>
          <div className='flex-grow'>
            <CustomizedProgressBars progress={item.percentage} color={item.color} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
