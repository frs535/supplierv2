import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

const RecursionTreeItem = ({items}) =>{

	return(
		<TreeItem nodeId={items.id} label={items.name}>
			{
				items.child != null && items.child.length !=0? items.child.map((item, index)=>{
					return (<RecursionTreeItem items={item}/>)
				}) : ""
			}
		</TreeItem>
	)
};

export const HierarchyTreeView = ({catalog}) => {

	return (
		<TreeView
			aria-label="multi-select"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 'auto', flexGrow: 1, maxWidth: 300, overflowY: 'auto' }}
			multiSelect
			>
			{catalog.map((item, index)=>{
				return(
					<RecursionTreeItem items={item}/>
				)
			})}
		</TreeView>
	)
};

export default HierarchyTreeView;