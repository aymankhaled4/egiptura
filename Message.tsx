// import React from 'react';
// import type { Message as MessageType, Program } from '../types';
// import { UserIcon, AnubisIcon } from './Icons';
// import { knowledgeBase } from '../services/knowledgeBase';
// import ProgramCard from './ProgramCard';
// import { useLanguage } from '../contexts/LanguageContext';

// interface MessageProps {
//     message: MessageType;
//     onViewDetails: (program: Program) => void;
// }

// const Message: React.FC<MessageProps> = ({ message, onViewDetails }) => {
//     const isModel = message.role === 'model';
//     const { language } = useLanguage();
    
//     const renderContent = (content: string) => {
//         if (!content.trim()) return null;

//         const lines = content.split('\n');
//         const markdownElements: React.ReactNode[] = [];
//         let listItems: string[] = [];

//         const flushList = () => {
//             if (listItems.length > 0) {
//                 markdownElements.push(
//                     <ul key={`ul-${markdownElements.length}`} className="list-disc list-inside space-y-1 my-2 pl-2">
//                         {listItems.map((item, index) => <li key={index}>{parseInlineMarkdown(item)}</li>)}
//                     </ul>
//                 );
//                 listItems = [];
//             }
//         };
        
//         const parseInlineMarkdown = (inlineText: string): React.ReactNode => {
//             const parts = inlineText.split(/(\*\*.*?\*\*|_.*?_)/g);
//             return parts.map((part, i) => {
//                 if (part.startsWith('**') && part.endsWith('**')) {
//                     return <strong key={i}>{part.slice(2, -2)}</strong>;
//                 }
//                 if (part.startsWith('_') && part.endsWith('_')) {
//                     return <em key={i}>{part.slice(1, -1)}</em>;
//                 }
//                 return part;
//             });
//         };

//         lines.forEach((line, index) => {
//             if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
//                 listItems.push(line.trim().substring(2));
//             } else {
//                 flushList();
//                 if (line.trim() !== '') {
//                      markdownElements.push(<p key={`p-${index}`} className="mb-2 last:mb-0">{parseInlineMarkdown(line)}</p>);
//                 }
//             }
//         });

//         flushList();
//         return <>{markdownElements}</>;
//     };


//     // Build the list of all programs to show for this message

//     const predefinedPrograms = message.programIds
//         ? knowledgeBase.packages.filter(p => message.programIds!.includes(p.id as number))
//         : [];
    
//     const customPrograms = message.customPrograms || [];
    
//     const allPrograms = [...predefinedPrograms, ...customPrograms];


//     return (
//         <div className={`flex items-start gap-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
//             {isModel && (
//                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-[#C59D5F]/50 shadow-sm">
//                     <AnubisIcon className="w-6 h-6 text-[#C59D5F]" />
//                 </div>
//             )}
            
//             <div className="flex flex-col gap-4 max-w-xl lg:max-w-2xl">
//                 {/* Render text bubble and images only if there is content */}
//                 {message.content && (
//                     <div
//                         className={`rounded-xl p-4 shadow-md ${
//                             isModel
//                                 ? 'bg-[#2a2b2e] text-gray-200 rounded-tl-none'
//                                 : 'bg-gray-700 text-gray-200 rounded-br-none'
//                         }`}
//                     >
//                         <div className="prose prose-p:my-0 prose-headings:my-2 max-w-none text-inherit prose-strong:text-[#C59D5F] prose-em:italic prose-em:text-gray-400">
//                              {renderContent(message.content)}
//                         </div>
//                     </div>
//                 )}
                
//                 {/* Render program cards for model messages */}
//                 {isModel && allPrograms.length > 0 && (
//                      <div className="flex flex-col gap-4">
//                         {allPrograms.map(program => (
//                             <ProgramCard 
//                                 key={program.id} 
//                                 program={program} 
//                                 onViewDetails={() => onViewDetails(program)}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {!isModel && (
//                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
//                     <UserIcon className="w-6 h-6 text-gray-300" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Message;


import React from 'react';
import type { Message as MessageType, Program } from '../types';
import { UserIcon, AnubisIcon } from './Icons';
import { knowledgeBase } from '../services/knowledgeBase';
import ProgramCard from './ProgramCard';
import { useLanguage } from '../contexts/LanguageContext';

interface MessageProps {
  message: MessageType;
  onViewDetails: (program: Program) => void;
}

const Message: React.FC<MessageProps> = ({ message, onViewDetails }) => {
  const isModel = message.role === 'model';
  const { language } = useLanguage();

  const renderContent = (content: string) => {
    if (!content.trim()) return null;
    const lines = content.split('\n');
    const markdownElements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        markdownElements.push(
          <ul
            key={`ul-${markdownElements.length}`}
            className="list-disc list-inside space-y-1 my-2 pl-2 text-gray-200"
          >
            {listItems.map((item, index) => (
              <li key={index}>{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const parseInlineMarkdown = (inlineText: string): React.ReactNode => {
      const parts = inlineText.split(/(\*\*.*?\*\*|_.*?_)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="text-[#C59D5F] font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('_') && part.endsWith('_')) {
          return (
            <em key={i} className="text-gray-400">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        listItems.push(line.trim().substring(2));
      } else {
        flushList();
        if (line.trim() !== '') {
          markdownElements.push(
            <p key={`p-${index}`} className="mb-2 last:mb-0 text-gray-100">
              {parseInlineMarkdown(line)}
            </p>
          );
        }
      }
    });

    flushList();
    return <>{markdownElements}</>;
  };

  const predefinedPrograms = Array.isArray(message.programIds)
  ? knowledgeBase.packages.filter(p => message.programIds.includes(Number(p.id)))
  : [];

const customPrograms = Array.isArray(message.customPrograms)
  ? message.customPrograms.filter((p, index, self) =>
      index === self.findIndex(cp => cp.id === p.id)
    )
  : [];

const allPrograms = [...customPrograms, ...predefinedPrograms].filter(
  (p, index, self) => index === self.findIndex(pp => pp.id === p.id)
);


  return (
    <div
      className={`flex items-start gap-4 transition-all duration-300 ${
        isModel ? 'justify-start' : 'justify-end'
      }`}
    >
      {isModel && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2a2b2e] flex items-center justify-center border border-[#C59D5F]/50 shadow-[0_0_10px_#C59D5F20]">
          <AnubisIcon className="w-6 h-6 text-[#C59D5F]" />
        </div>
      )}

      <div className="flex flex-col gap-4 max-w-xl lg:max-w-2xl">
        {message.content && (
          <div
            className={`rounded-2xl p-4 shadow-lg border border-[#C59D5F]/20 ${
              isModel
                ? 'bg-[#1b1c1e] text-gray-100 rounded-tl-none shadow-[0_0_15px_#C59D5F10]'
                : 'bg-[#2a2b2e] text-gray-100 rounded-br-none shadow-[0_0_10px_#C59D5F10]'
            }`}
          >
            <div className="prose prose-p:my-0 prose-headings:my-2 max-w-none text-inherit prose-strong:text-[#C59D5F] prose-em:italic prose-em:text-gray-400">
              {renderContent(message.content)}
            </div>
          </div>
        )}

        {isModel && allPrograms.length > 0 && (
          <div className="flex flex-col gap-4">
            {allPrograms.map(program => (
              <ProgramCard
                key={program.id}
                program={program}
                onViewDetails={() => onViewDetails(program)}
              />
            ))}
          </div>
        )}
      </div>

      {!isModel && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C59D5F]/20 flex items-center justify-center border border-[#C59D5F]/40 shadow-[0_0_8px_#C59D5F20]">
          <UserIcon className="w-6 h-6 text-[#C59D5F]" />
        </div>
      )}
    </div>
  );
};

export default Message;
