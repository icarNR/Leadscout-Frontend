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

  return (
    <div className='flex flex-col'>
      {/* Map through the progress bar data and render a progress bar for each */}
      {progressBarsData.map((item, index) => (
          <div key={index} className='flex flex-row max-w-96 p-1 border-black'>
          <span className='min-w-[130px] text-sm flex-shrink-1 '>{item.name}</span>
          <div className={`flex-grow w-full  `}><CustomizedProgressBars progress={item.percentage} color={item.color} /></div></div>
      ))}
    </div>
  );
};

export default Results;
