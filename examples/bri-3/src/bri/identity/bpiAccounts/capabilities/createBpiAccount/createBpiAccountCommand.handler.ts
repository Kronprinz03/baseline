import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BpiSubjectAccountAgent } from '../../../bpiSubjectAccounts/agents/bpiSubjectAccounts.agent';
import { BpiAccountAgent } from '../../agents/bpiAccounts.agent';
import { BpiAccountStorageAgent } from '../../agents/bpiAccountsStorage.agent';
import { CreateBpiAccountCommand } from './createBpiAccount.command';

@CommandHandler(CreateBpiAccountCommand)
export class CreateBpiAccountCommandHandler
  implements ICommandHandler<CreateBpiAccountCommand>
{
  constructor(
    private accountAgent: BpiAccountAgent,
    private accountStorageAgent: BpiAccountStorageAgent,
    private subjectAccountAgent: BpiSubjectAccountAgent,
  ) {}

  async execute(command: CreateBpiAccountCommand) {
    const ownerBpiSubjectAccounts =
      await this.subjectAccountAgent.getBpiSubjectAccountsAndThrowIfNotExist(
        command.ownerBpiSubjectAccountsIds,
      );

    const newBpiSubjectCandidate = this.accountAgent.createNewBpiAccount(
      ownerBpiSubjectAccounts,
    );

    const newBpiSubject = await this.accountStorageAgent.createNewBpiAccount(
      newBpiSubjectCandidate,
    );
    return newBpiSubject.id;
  }
}
