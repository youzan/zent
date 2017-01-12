HOOKS=$PROJECT/.multi_hooks/all_hooks/*/$HOOK_TYPE
HOOKS_NUMBER=`ls -s $HOOKS 2>/dev/null | wc -l`

if [ $(($HOOKS_NUMBER+0)) -gt 0 ];then

	for hook in $HOOKS
	do
	 	$hook $*
	 	exit_code=$?
	 	if [ $exit_code -ne 0 ];then
	 		exit 1
	 	fi
	done

fi